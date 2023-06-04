import { View, Text,TouchableOpacity, ScrollView } from 'react-native'
import React,{useEffect,useState} from 'react'
import { useRoute } from '@react-navigation/native';
export default function Mypred({navigation}) {
    const route = useRoute();
    const { userinfo } = route.params;
    const [pred, setPred] = useState([]);
    const mypred = async () => {
  console.log('http://192.168.229.112:8000/auth/getpredictionbyuserid/'+userinfo.id)
        try {
            const responsex = await fetch('http://192.168.229.112:8000/auth/getpredictionbyuserid/'+userinfo.id )
      
          const jsonx = await responsex.json();
           console.log(jsonx)
           setPred(jsonx)
        } catch (error) {
          console.log('Error fetching data:', error);
        }
    
    
    
    
      };
      
      useEffect(() => {
       mypred()
      },[]);
  return (
    <View style={{ flex: 1, alignItems: 'center',backgroundColor:'red'}}>
    <View style={{height:'10%',flexDirection:'row',alignItems:'center',width:'100%',backgroundColor:'red'}}>
    <TouchableOpacity onPress={()=>navigation.goBack()} style={{marginLeft:'5%'}}>
 <Text style={{color:'white',fontSize:17,fontWeight:'500'}}>Back</Text>
</TouchableOpacity>
<Text style={{color:'white',fontSize:17,fontWeight:'500',left:'100%'}}>My Predictions</Text>

    </View>
     <View style={{backgroundColor:'#E1e1e1',borderTopRightRadius:15,borderTopLeftRadius:15,width:'100%',height:'90%'}}>
     
        <ScrollView>
            {pred.map((item,i)=>(
                <View key={i} style={{marginTop:i==0?'10%':0,flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',backgroundColor:'white',width:'95%',height:45,alignSelf:'center',borderRadius:5,marginBottom:'3%'}}>
                                    <Text style={{color:'black',fontWeight:'500',fontSize:16,marginLeft:5}}>#{item.Predictions_id}</Text> 
                  <Text style={{color:'black',fontWeight:'500',fontSize:16,marginLeft:5}}>{item.Predictions_Result}</Text> 
                  <Text style={{color:'black',fontWeight:'500',fontSize:16,marginLeft:5}}>{Number(item.Predictions_Percentage).toFixed(2)}%</Text>
                  <Text style={{color:'black',fontWeight:'500',fontSize:16,marginLeft:5}}>{item.created_at.substring(0,10)}-{item.created_at.substring(12,19)}</Text>
                </View>
            ))}
        </ScrollView>


          </View>
   </View>
  )
}