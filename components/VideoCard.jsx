import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {icons} from '../constants';
import {Video, ResizeMode} from 'expo-av';

const VideoCard = ({
  video: {
    title,
    thumbnail,
    video,
    creator: {username, avatar},
  },
}) => {
  const [play, setPlay] = useState(false);
  return (
    <View className="px-4 mb-14 items-center">
      <View className="flex-row items-start">
        <View className="flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary p-0.5">
            <Image
              source={{uri: avatar}}
              className="w-full h-full rounded-lg"
              resizeMode="contain"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text className="text-white font-psemibold text-sm">{title}</Text>
            <Text className="text-xs text-gray-100 font-pregular">
              {username}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>
      {play ? (
        <Video
          source={{uri: video}}
          className="w-full h-60 rounded-xl "
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={status => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          className="w-full h-60 rounded-xl relative justify-center items-center"
          onPress={() => setPlay(true)}>
          <Image
            className="w-full h-full rounded-xl mt-5"
            source={{uri: thumbnail}}
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
