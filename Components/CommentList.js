import React, { Component, PropTypes } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Text,
  View, TouchableOpacity,
  RefreshControl,
  ScrollView,
  Platform,
  TouchableWithoutFeedback ,
  Keyboard 
} from 'react-native';
import Comments from './Comments';
import {connect} from 'react-redux';
import { firebaseApp } from './FirebaseConfig';
import { FlatList } from 'react-native-gesture-handler';


class CommentList extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      comment: '',
      listComment: [],
      key:''
    };
  }

  getDerivedStateFromProps(nextProps){ 
    this.setState({key: nextProps.idProduct})
    firebaseApp
      .database()
      .ref('Comments/')
      .orderByChild('idProduct')
      .equalTo(`${this.props.idProduct}`)
      .on('value', (snapshot) => {
        const temp = [];
        snapshot.forEach((child) => {
          temp.push({
            key: child.key,
            idProduct: child.val().idProduct,
            idUser: child.val().idUser,
            nameUser: child.val().nameUser,
            content: child.val().content,
            createAt: child.val().createAt,
            avatarUser: child.val().avatarUser,
          });   
          this.setState({listComment: temp});      
        });   
       // this.setState({listComment: temp});
       // console.log('comment' + this.state.listComment)  
      });     
  }


  postComment() {
    if(this.state.comment != null){
       firebaseApp.database().ref('Comments').push({
                  idProduct: this.props.idProduct,
                  idUser: this.props.userId,
                  nameUser: this.props.userName,
                  content: this.state.comment,
                  createAt: new Date().toISOString(), 
                  avatarUser: this.props.userPhoto             
      });
      this.setState({comment: null})
     
    }

  }

  render() {
   
    return (
      <View style={styles.container} >
      <Text>{this.props.idProduct}</Text>
          <KeyboardAvoidingView
       behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.containerInput}>
      
          <TextInput
            placeholder="Add a comment..."
            keyboardType="twitter" // keyboard with no return button
            autoFocus={true} // focus and show the keyboard
            style={styles.input}
            value={this.state.comment}
            onChangeText={(text) => this.setState({comment: text })} // handle input changes
           // onSubmitEditing={this.onSubmitEditing} // handle submit event
          />
          {/* Post button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.postComment()}
          >
            {/* Apply inactive style if no input */}
            <Text style={[styles.text, !this.state.text ? styles.inactive : []]}>Post</Text>
          </TouchableOpacity>
        </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
          <FlatList
          data={this.state.listComment}
          renderItem={({item}) => {
            return (
            <Comments userAvatar= {item.avatarUser} userName={item.nameUser} comment={item.content} createAt={item.createAt} />
            );
          }}
          keyExtractor={(item) => item.key.toString()}
        />       
        
      </View>
     
    );
  }

}

const mapStateToProps = (state) => {
  return {
    ...state.auth,
  };
};

export default connect(mapStateToProps, null)(CommentList);

const styles = StyleSheet.create({
  containerCmt: {
    backgroundColor: '#FFF',
    paddingTop: 20,
    
  },
  containerInput: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#EEE',
    alignItems: 'center',
    paddingLeft: 15,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 15,
  },
  button: {
    height: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactive: {
    color: '#CCC',
  },
  text: {
    color: '#3F51B5',
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    textAlign: 'center',
    fontSize: 15,
  },
});