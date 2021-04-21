import React, { PureComponent, PropTypes } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';
import moment from 'moment';


class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

//   static propTypes = {
//     // Comment object shape
//     comment: PropTypes.shape({
//       content: PropTypes.string.isRequired,
//       created: PropTypes.string.isRequired,
//       // User object shape
//       user: PropTypes.shape({
//         name: PropTypes.string.isRequired,
//         avatar: PropTypes.string.isRequired,
//       }).isRequired,
//     }).isRequired,
//   };


   render() {
    // Pull comment object out of props
    // const { comment } = this.props;
    // // Pull data needed to display a comment out of comment object
    // const { content, created, user } = comment;
    // // Pull user name and avatar out of user object
    // const { name, avatar } = user;
    return (
      <View style={styles.cmtBox}>
        <View style={styles.avatarContainer}>
         <Image
            resizeMode='contain'
            style={styles.avatar}
            source={{uri: this.props.userAvatar}}
          />
        </View>
        <View style={styles.contentContainer}>    
            <Text style={[styles.text, styles.name]}>{this.props.userName} </Text>
            <Text style={styles.text}>{this.props.comment}</Text>        
            <Text style={[styles.text, styles.created]}>{this.props.createAt}</Text>
        </View>
      </View>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     ...state.auth,
//   };
// };

export default Comments;
// export default connect(mapStateToProps, null)(FindFriendScreen);

const styles = StyleSheet.create({
  cmtBox: {
    flexDirection: 'row',
  },
  avatarContainer: {
    alignItems: 'center',
    marginLeft: 5,
    paddingTop: 10,
    width: 40,
  },
  contentContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#EEE',
    padding: 5,
    flexDirection: 'column'
  },
  avatar: {
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 15,
    width: 30,
    height: 30,
  },
  text: {
    color: '#000',
    fontFamily: 'Avenir',
    fontSize: 14,
  },
  name: {
    fontWeight: 'bold',
  },
  created: {
    color: '#BBB',
    fontSize: 13,
  },
});