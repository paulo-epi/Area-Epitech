import { StyleSheet } from 'react-native';

const styleDark = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#22272e', // black
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tab: {
    width: '50%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#22272e',
  },
  tabText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    opacity: 0.5,
  },
  selectedTab: {
    width: '50%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#316dca',
  },
  selectedTabText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  header: {
    text: {
      color: 'white',
      fontSize: 25,
      fontWeight: 'bold',
      top: 5,
    },
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    backgroundColor: '#316dca',
    height: 80,
  },
  addButton: {
    text: {
      color: 'white',
      fontSize: 25,
      fontWeight: 'bold',
    },
    width: '90%',
    height: 'auto',
    borderRadius: 10,
    backgroundColor: '#316dca',
    alignItems: 'center',
    justifyContent: 'center',
    left: 20,
    marginTop: 30,
    marginBottom: 20,
    padding: 5,
  },
  workflowContainer: {
    icon: {
      position: 'absolute',
      left: 0,
      color: 'white',
    },
    flexDirection: 'column',
    backgroundColor: '#2d333b',
    marginTop: 30,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 5,
    borderColor: '#444c56',
    borderWidth: 1,
  },
  workflowButtons: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 10,
  },
  actionButton: {
    text: {
      color: 'white',
      fontSize: 15,
    },
    icon: {
      color: '#316dca',
    },
    backgroundColor: '#316dca',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: 'auto',
  },
  listItem: {
    text: {
      fontSize: 20,
    },
    padding: 10,
    backgroundColor: '#f9f9f9',
    margin: 5,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  popUp: {
    text: {
      color: 'white',
      fontSize: 15,
      fontWeight: 'bold',
      marginTop: 10,
    },
    input: {
      width: '90%',
      height: 40,
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 10,
      marginTop: 10,
    },
    width: '85%',
    height: 'auto',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#22272e',
    borderRadius: 10,
  },
  closePop: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#316dca',
    bottom: 10,
  },
  popupView: {
    flex: 1,
    justifyContent: 'center',
  },
  logoReaction: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  tooltip: {
    position: 'absolute',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 5,
    width: 'auto',
    height: 'auto',
    top: 0,
    right: 0,
  },
  switch: {
    false: 'white',
    true: 'green',
  }
});

export default styleDark;
