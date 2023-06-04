import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
export default function Account({navigation}) {
    const route = useRoute();
    const { userinfo } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center',backgroundColor:'red'}}>
    <View style={{height:'10%',flexDirection:'row',alignItems:'center',width:'100%',backgroundColor:'red'}}>
    <TouchableOpacity onPress={()=>navigation.goBack()} style={{marginLeft:'5%'}}>
 <Text style={{color:'white',fontSize:17,fontWeight:'500'}}>Back</Text>
</TouchableOpacity>
<Text style={{color:'white',fontSize:17,fontWeight:'500',left:'100%'}}>Account        </Text>

    </View>
     <View style={{backgroundColor:'#E1e1e1',borderTopRightRadius:15,borderTopLeftRadius:15,width:'100%',height:'90%'}}>
     
       <TouchableOpacity onPress={()=>{navigation.navigate('Info',{userinfo:userinfo})}} style={{width:'90%',marginTop:'10%',justifyContent:'center',borderRadius:5,height:55,alignSelf:'center',backgroundColor:'white'}}>
             <Text style={{marginLeft:'5%',color:'black',fontSize:17,fontWeight:'500'}}>Personal Info</Text>
       </TouchableOpacity>
       <TouchableOpacity onPress={()=>{navigation.navigate('Mypred',{userinfo:userinfo})}} style={{width:'90%',marginTop:'5%',justifyContent:'center',borderRadius:5,height:55,alignSelf:'center',backgroundColor:'white'}}>
             <Text style={{marginLeft:'5%',color:'black',fontSize:17,fontWeight:'500'}}>My Predictions</Text>
       </TouchableOpacity>
       <TouchableOpacity onPress={()=>{navigation.navigate('ML')}} style={{width:'90%',marginTop:'5%',justifyContent:'center',borderRadius:5,height:55,alignSelf:'center',backgroundColor:'white'}}>
             <Text style={{marginLeft:'5%',color:'black',fontSize:17,fontWeight:'500'}}>Learn More About Machine Learning</Text>
       </TouchableOpacity>
       <TouchableOpacity onPress={()=>{navigation.replace('LoginScreen')}} style={{width:'40%',marginTop:'5%',justifyContent:'center',borderRadius:25,height:45,alignSelf:'center',backgroundColor:'red'}}>
             <Text style={{color:'white',fontSize:17,fontWeight:'500',alignSelf:'center'}}>Logout</Text>
       </TouchableOpacity>
   
   


          </View>
   </View>
  )
}