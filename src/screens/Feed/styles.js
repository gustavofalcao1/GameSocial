import { StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 1,
    marginBottom: 0.5,
    backgroundColor: '#fff'
  },
  postsList: {},
  postContent: {
    marginBottom: 20,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 5,
    alignItems: 'center',
  },
  postHeaderContent: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  postProfile: {},
  postAuthorProfile: {
    borderRadius: 20,
    width: 40,
    height: 40,
    borderWidth: 3,
    borderColor: '#00CC10'
  },
  postUserInfo: {
    paddingHorizontal: 5,
  },
  postAuthor: {
    fontSize: 14,
    color: '#000000',
    fontWeight: 'bold',
  },
  postPlace: {
    paddingHorizontal: 2,
    fontSize: 12,
    color: '#666',
  },
  postOptions: {},
  postPicture: {
    width: '100%',
    height: 400,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    alignItems: 'center',
  },
  postActionsLeft: {
    flexDirection: 'row',
  },
  postActionButton: {
    paddingHorizontal: 5,
  },
  postActionsRight: {
    flexDirection: 'row',
  },
  postLikesCount: {
    paddingHorizontal: 5
  },
  postLikes:{
    fontWeight: 'bold',
    fontSize: 12,
  },
  postInfor: {
    flexDirection: 'row',
    paddingHorizontal: 5
  },
  postAuthorDescription: {
    color: '#000',
  },
  postCommentsDetails: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 2,
    fontSize: 12,
  },
  postComments: {maxWidth: '75%',},
  postSeeMoreComments: {
    color:'#666',
  },
  postTranslate: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  postDate:{
    fontSize: 11,
    color:'#666',
  },
  postTranslateText: {
    fontSize: 11,
  }
})

export default styles