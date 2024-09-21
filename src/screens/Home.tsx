import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from '../components/common/Layout';
import {ProfileURL, SCHEDULE_CARD, TAB_DATA} from '../components/utils';
import VectorIcon from '../components/common/VectorIcon';
import Spacer from '../components/common/Spacer';
import axios from 'axios';
import {useSelector} from 'react-redux';

const Home = () => {
  const [activeTab, setActiveTab] = useState('Upcoming Schedules');
  const [scheduleData, setScheduleData] = useState([]);
  const [dashboardData, setDashboaaardData] = useState({});
  const User = useSelector(state => state?.user);

  console.log('User:::: ', User);

  const ScheduleAPI = async () => {
    try {
      const response = await axios.get(
        'http://yrg-198744627.ap-south-1.elb.amazonaws.com/api/upcoming-schedules',
        {
          headers: {Authorization: 'Bearer ' + User?.data?.access},
        },
      );
      setScheduleData(response.data);
    } catch (error) {
      console.log('Error from ScheduleAApi: ', error);
    }
  };

  const DashboardAPI = async () => {
    try {
      const response = await axios.get(
        'http://yrg-198744627.ap-south-1.elb.amazonaws.com/api/dashboard-status/',
        {
          headers: {Authorization: 'Bearer ' + User?.data?.access},
        },
      );
      setDashboaaardData(response.data);

      console.log('response: ', response);
      
    } catch (error) {
      console.log('Error from dashboardData: ', error);
    }
  };

console.log('dashboardData: ',dashboardData);


  useEffect(() => {
    ScheduleAPI();
    DashboardAPI()
  }, []);

  const renderItem = ({item}) => {
    return (
      <View className="border border-gray-300">
        <View className="flex-row items-center rounded bg-gray-200 space-x-4">
          <View className="bg-gray-400 p-4">
            <Text className="text-black font-bold text-xl">20</Text>
            <Text className="text-black font-normal">July</Text>
          </View>
          <View className=" w-[70%]">
            <Text className="text-black font-bold text-[15px]">STI/DSRC</Text>
            <Text className="text-black font-normal">
              Location: <Text className="font-bold ">{item?.zone_name}</Text>
            </Text>
          </View>
        </View>

        <View className="my-4 space-y-2 rounded">
          <View className="flex-row items-center  mx-4 space-x-6">
            <Text className="text-black text-sm">
              State: <Text className="font-bold">{item?.state_name}</Text>
            </Text>
            <Text className="text-black text-sm">
              Block: <Text className="font-bold">Tamil Nadu</Text>
            </Text>
          </View>
          <View className="flex-row items-center  mx-4 space-x-6">
            <Text className="text-black text-sm">
              District: <Text className="font-bold">{item?.district_name}</Text>
            </Text>
            <Text className="text-black text-sm">
              Disha Cluster: <Text className="font-bold">Tamil Nadu</Text>
            </Text>
          </View>
          <View className="flex-row items-center  mx-4 space-x-6">
            <Text className="text-black text-sm">
              Type: <Text className="font-bold">{item?.form_type}</Text>
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const ItemSeparatorComponent = () => {
    return <View className="mb-4" />;
  };
  return (
    <Layout>
      <ScrollView>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Image source={{uri: ProfileURL}} className="h-10 w-10 rounded" />
            <View>
              <Text className="text-black font-normal text-sm">
                Good Morning!
              </Text>
              <Text className="text-black font-bold text-sm">John Doe</Text>
            </View>
          </View>
          <View className="flex-row items-center gap-2">
            <View>
              <VectorIcon
                type="Ionicons"
                name="notifications-outline"
                color={'#b1b1b1'}
                size={30}
              />
              <View className="h-3 w-3 bg-red-600 rounded-full border border-gray-400 absolute right-1" />
            </View>
            <VectorIcon type="Entypo" name="grid" color={'black'} size={30} />
          </View>
        </View>

        <Spacer height={30} />
        <View className="flex-row items-center gap-2">
          <Text className="text-black font-bold text-5xl">{dashboardData?.total}</Text>
          <View>
            <Text className="text-black font-medium text-sm">My total</Text>
            <Text className="text-black font-medium text-sm">Schedules</Text>
          </View>

          <VectorIcon
            type="Ionicons"
            name="add-circle"
            color={'orange'}
            size={40}
          />
        </View>

        <Spacer height={20} />

        <View className="flex-row items-center space-x-4">
          {SCHEDULE_CARD.map((item, index) => {
            return (
              <View
                key={index}
                className={`${
                  item?.id === 1 ? 'bg-green-500' : 'bg-orange-500'
                } px-4 py-14 rounded`}>
                <Text className="text-white font-bold text-5xl">
                  {item?.id === 1 ? dashboardData?.completed : dashboardData?.pending}
                </Text>
                <Text className="text-white font-bold text-sm">
                  {item?.title}
                </Text>
              </View>
            );
          })}
        </View>
        <Spacer height={20} />
        <View className=" rounded">
          <Text className="text-orange-400 font-medium bg-gray-300 p-4">
            In-progress Schedule
          </Text>
          <View className="flex-row items-center justify-between bg-gray-200 p-4">
            <Text className="text-black font-bold text-sm">STI/DSRC</Text>
          </View>
        </View>

        <Spacer height={30} />
        <View className="flex-row items-center border-b border-b-gray-300 justify-between">
          {TAB_DATA.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => setActiveTab(item?.title)}
                key={index}
                className={`flex-row items-center gap-2 ${
                  item?.title === activeTab ? 'border-b-2 border-black' : ''
                }`}>
                <Text className="text-black font-medium text-sm pb-2">
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Spacer height={15} />
        <Text className="text-black font-medium text-sm">
          Total Upcoming Schedules [{scheduleData.length}]
        </Text>
        <Spacer height={15} />

        <FlatList
          data={scheduleData}
          nestedScrollEnabled
          ItemSeparatorComponent={ItemSeparatorComponent}
          renderItem={renderItem}
        />
      </ScrollView>
    </Layout>
  );
};

export default Home;
