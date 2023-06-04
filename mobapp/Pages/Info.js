import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
export default function Info({navigation}) {
    const route = useRoute();
    const { userinfo } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center',backgroundColor:'red'}}>
    <View style={{height:'10%',flexDirection:'row',alignItems:'center',width:'100%',backgroundColor:'red'}}>
    <TouchableOpacity onPress={()=>navigation.goBack()} style={{marginLeft:'5%'}}>
 <Text style={{color:'white',fontSize:17,fontWeight:'500'}}>Back</Text>
</TouchableOpacity>
<Text style={{color:'white',fontSize:17,fontWeight:'500',left:'100%'}}>Personal Info</Text>

    </View>
     <View style={{backgroundColor:'#E1e1e1',borderTopRightRadius:15,borderTopLeftRadius:15,width:'100%',height:'90%'}}>
    <View style={{marginTop:'10%'}}>
    <Text style={{marginLeft:'6%',color:'black',fontWeight:'500'}}>Frist Name</Text>
       <TouchableOpacity  style={{width:'90%',justifyContent:'center',borderRadius:5,height:55,alignSelf:'center',backgroundColor:'white'}}>
        <Text style={{marginLeft:'5%',color:'black',fontSize:17,fontWeight:'500'}}>{userinfo.first_name}</Text>
       </TouchableOpacity>
    </View>
    <View style={{marginTop:'3%'}}>
    <Text style={{marginLeft:'6%',color:'black',fontWeight:'500'}}>Last Name</Text>
       <TouchableOpacity  style={{width:'90%',justifyContent:'center',borderRadius:5,height:55,alignSelf:'center',backgroundColor:'white'}}>
        <Text style={{marginLeft:'5%',color:'black',fontSize:17,fontWeight:'500'}}>{userinfo.last_name}</Text>
       </TouchableOpacity>
    </View>
    
    <View style={{marginTop:'3%'}}>
    <Text style={{marginLeft:'6%',color:'black',fontWeight:'500'}}>Email</Text>
       <TouchableOpacity  style={{width:'90%',justifyContent:'center',borderRadius:5,height:55,alignSelf:'center',backgroundColor:'white'}}>
        <Text style={{marginLeft:'5%',color:'black',fontSize:17,fontWeight:'500'}}>{userinfo.email}</Text>
       </TouchableOpacity>
    </View>
    
    <View style={{marginTop:'3%'}}>
    <Text style={{marginLeft:'6%',color:'black',fontWeight:'500'}}>Mobile</Text>
       <TouchableOpacity  style={{width:'90%',justifyContent:'center',borderRadius:5,height:55,alignSelf:'center',backgroundColor:'white'}}>
        <Text style={{marginLeft:'5%',color:'black',fontSize:17,fontWeight:'500'}}>{userinfo.Mobile}</Text>
       </TouchableOpacity>
    </View>
    <View style={{marginTop:'3%'}}>
    <Text style={{marginLeft:'6%',color:'black',fontWeight:'500'}}>User ID</Text>
       <TouchableOpacity  style={{width:'90%',justifyContent:'center',borderRadius:5,height:55,alignSelf:'center',backgroundColor:'white'}}>
        <Text style={{marginLeft:'5%',color:'black',fontSize:17,fontWeight:'500'}}>{userinfo.id}</Text>
       </TouchableOpacity>
    </View>
   


          </View>
   </View>
  )
}