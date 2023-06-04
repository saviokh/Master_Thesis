import React, { useState } from 'react';
import { ActivityIndicator, Linking,Button, Image, Text, View, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import Video from 'react-native-video';




import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
const HomePage = ({navigation}) => {
  const route = useRoute();
  const { userinfo } = route.params;
  const [image, setImage] = useState(null);
  const [classes, setClasses] = useState(null);
  const [pred, setPred] = useState(null);

const [load, setload] = useState(false);
  const uploadImage = async () => {
    // Here you can use ImagePicker to select the image and then upload it
    // Unfortunately, it requires the @react-native-community/pickers package
setClasses(null)
setPred(null)
    console.log('Upload Image button clicked');
    let options = {
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 300,
      };
  
      launchImageLibrary(options, response => {
        if(response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          const source = { uri: response.assets[0].uri };
          setImage(source.uri);
        }
      });
    // const result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    // });

    // if (!result.cancelled) {
    //   setImage(result.uri);
    //   // Then you can use fetch or axios to upload the image
    // }
  };
  const handlePress = () => {
    const url = `https://www.google.com/search?q=${encodeURIComponent(classes)} Lung Disease`;
    Linking.openURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log(`Can't handle url: ${url}`);
      }
    }).catch(err => console.error('An error occurred', err));
  };
  const check = async () => {
    setload(true)
    try {
      // Assuming `imageUri` contains the URI of the selected image
      const uriParts = image.split('.');
      const fileType = uriParts[uriParts.length - 1];
  console.log(uriParts,fileType)
      const formData = new FormData();
   
      formData.append('file', {
        uri: image,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
  
      const response = await fetch('http://192.168.229.112:8000/auth/api/predictions/', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      const json = await response.json();
      setload(false)
     setClasses(json.classes)
     setPred(json.predictions)

    
  
       const responsex = await fetch('http://192.168.229.112:8000/auth/AddPrediction/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Predictions_Result:json.classes,
          username:userinfo.id,
          Predictions_Percentage:json.predictions,
        }),
      })
  
      const jsonx = await responsex.json();
       console.log(jsonx)
    } catch (error) {
      console.log('Error fetching data:', error);
    }




  };
  return (
    <View style={{ flex: 1, alignItems: 'center',backgroundColor:'red'}}>
     <View style={{height:'10%',justifyContent:'space-between',flexDirection:'row',alignItems:'center',width:'100%',backgroundColor:'red'}}>
<Text  style={{color:'white',fontSize:17,fontWeight:'500',marginLeft:'5%'}}>Disease Detection</Text>
<TouchableOpacity onPress={()=>navigation.navigate('Account',{userinfo})} style={{marginRight:'5%'}}>
  <Text style={{color:'white',fontSize:17,fontWeight:'500'}}>Account</Text>
</TouchableOpacity>
     </View>
      <View style={{backgroundColor:'black',borderTopRightRadius:15,borderTopLeftRadius:15,width:'100%',height:'90%'}}>
        {/* <Text style={{ fontSize: 18, marginBottom: 20,color:'black',marginTop:'5%',width:'95%',alignSelf:'center' }}>
        Welcome to our Machine Learning-powered disease detection system!
        </Text> */}
    
      {/* <Button title="Take  Picture"  onPress={uploadImage} /> */}
<View style={{alignSelf:'center',alignItems:'center',justifyContent:'center',width:'100%'}}>
{/* <Button title="Upload Image" onPress={uploadImage} /> */}


      {image ?<TouchableOpacity style={{alignSelf:'center'}} disabled={load?true:false} onPress={uploadImage} >
      <Image source={{ uri: image }} style={{marginTop:'5%' ,width: 200, height: 200 }} />
      </TouchableOpacity>
      :
      <TouchableOpacity onPress={uploadImage} style={{marginTop:'5%',borderRadius:6 ,justifyContent:'center',width: 200, height: 200,backgroundColor:'gray' }}>
<Text style={{color:'white',fontWeight:'500',alignSelf:'center'}}>Upload Image</Text>
      </TouchableOpacity>}
      {image&&<View style={{marginTop:'5%'}}>
        {/* <Button  title="Check Disease" onPress={check} /> */}
        <TouchableOpacity onPress={check} style={{height:45,alignSelf:'center',backgroundColor:'red',justifyContent:'center',borderRadius:20}}>
<Text style={{color:'white',fontSize:16,paddingHorizontal:10}}>Check Disease</Text>
        </TouchableOpacity>
        </View>}
        {load?
      <Video source={require('../../assets/vid.mp4')}   
      repeat={true}
      resizeMode='cover'
      style={{
        marginTop:'5%',
       width:'100%',
       height:100,
      
      //  top: 0,
      //  left: 0,
      //  bottom: 0,
      //  right: 0,
     }} />
:null}
        {pred&&<View style={{marginTop:'5%'}}>
            <Text style={{ fontSize: 18,color:'white' }}>Classes: <Text style={{color:classes=='Normal'?'green':'red'}}>{classes}</Text></Text>
            <Text style={{ fontSize: 18, marginBottom: 20,color:'white' }}>Preditcion: {Number(pred).toFixed(2)}%</Text>
         {classes=='Normal'?null:
          <TouchableOpacity onPress={handlePress} style={{backgroundColor:'red',width:'50%',borderRadius:10,alignSelf:'center'}}><Text style={{padding:10,color:'white'}}>More Info about {classes}</Text></TouchableOpacity>
        }
         
           </View>}

</View>


           </View>
    </View>
  );
};

export default HomePage;
