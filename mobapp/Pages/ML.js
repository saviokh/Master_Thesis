import { View, Text,TouchableOpacity, ScrollView, Image, Linking } from 'react-native'
import React from 'react'

export default function ML({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center',backgroundColor:'red'}}>
    <View style={{height:'10%',flexDirection:'row',alignItems:'center',width:'100%',backgroundColor:'red'}}>
    <TouchableOpacity onPress={()=>navigation.goBack()} style={{marginLeft:'5%'}}>
 <Text style={{color:'white',fontSize:17,fontWeight:'500'}}>Back</Text>
</TouchableOpacity>
<Text style={{color:'white',fontSize:17,fontWeight:'500',left:'100%'}}>Machine Learning</Text>

    </View>
     <View style={{backgroundColor:'#E1e1e1',borderTopRightRadius:15,borderTopLeftRadius:15,width:'100%',height:'90%'}}>
   <ScrollView contentContainerStyle={{paddingBottom:100}}>
    <Text style={{width:'95%',alignSelf:'center',color:'black',fontWeight:'500',fontSize:17}}>Machine learning (ML) is a field devoted to understanding and building methods that let machines "learn" – that is, methods that leverage data to improve computer performance on some set of tasks. Machine learning algorithms build a model based on sample data, known as training data, in order to make predictions or decisions without being explicitly programmed to do so. These algorithms are used in a wide variety of applications, such as in medicine, email filtering, speech recognition, agriculture, and computer vision, where it is difficult or unfeasible to develop conventional algorithms to perform the needed tasks.

Machine learning approaches are traditionally divided into three broad categories, depending on the nature of the "signal" or "feedback" available to the learning system:

Supervised learning: The computer is presented with example inputs and their desired outputs, given by a "teacher", and the goal is to learn a general rule that maps inputs to outputs.

Unsupervised learning: No labels are given to the learning algorithm, leaving it on its own to find structure in its input. Unsupervised learning can be a goal in itself (discovering hidden patterns in data) or a means towards an end (feature learning).

Reinforcement learning: A computer program interacts with a dynamic environment in which it must perform a certain goal (such as driving a vehicle or playing a game against an opponent). As it navigates its problem space, the program is provided feedback that's analogous to rewards, which it tries to maximize.</Text>
  <Text style={{width:'95%',marginTop:'5%',alignSelf:'center',color:'black',fontWeight:'500',fontSize:17}}>For a more detailed understanding, you can read the full article on</Text>
  <TouchableOpacity onPress={()=>{Linking.openURL('https://en.wikipedia.org/wiki/Machine_learning')}} style={{width:200,height:180,backgroundColor:'white',marginLeft:'5%',marginTop:'3%',borderRadius:6}}>
<Image
source={require('../assets/ai.jpg')}
style={{width:'100%',height:'80%',borderTopRightRadius:6,borderTopLeftRadius:6}}
resizeMode='stretch'
/>
<Text style={{color:'black',fontSize:14,marginLeft:5}}>Machine learning-Wikipedia</Text>
  </TouchableOpacity>
   </ScrollView>
 
   


          </View>
   </View>
  )
}