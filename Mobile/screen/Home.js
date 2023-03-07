import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Switch, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';

import Modal from "react-native-modal";
import { Tooltip } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';

import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { url } from '../components/Variables';
import { fetchData } from '../utils/api';

import MyWorkflows from '../components/MyWorkflows';
import Action from '../components/Area/Action';
import Reaction from '../components/Area/Reaction';
import MyModalEntry, { MyModalEntryReaction0, MyModalEntryReaction1, MyModalEntryReaction2, MyModalEntryReaction3, MyModalEntryReaction4 } from '../components/MyModalEntry';

import styleDark from '../components/Styles/styleDark';
import styleLight from '../components/Styles/styleLight';

import ServicesOAuth from '../components/ServicesOAuth';
import MySettings from '../components/MySettings';

export function Home({ navigation }) {
  // Workflows const
  const [switchStates, setSwitchStates] = useState({});
  const [token, setToken] = useState('');
  const [inputValueAction, setinputValueAction] = useState('');
  const [inputValueReaction1, setInputValueReaction1] = useState('');
  const [inputValueReaction2, setInputValueReaction2] = useState('');
  const [inputValueReaction3, setInputValueReaction3] = useState('');
  const [inputValues, setInputValues] = useState([]);

  const [styles, setStyles] = useState(isDarkMode ? styleDark : styleLight);

  // Dark mode
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Update color when isDarkMode prop changes
    setStyles(isDarkMode ? styleDark : styleLight);
  }, [isDarkMode]);

  const handleSwitchChange = (value) => {
    setIsDarkMode(value);
  }
  // End of Dark Mode

  // import workflows functions
  const [
    workflows, setWorkflows, isActionModalVisible, setIsActionModalVisible, isReactionModalVisible, setIsReactionModalVisible, handleAddWorkflow, handleClickAction, handleClickReaction, handleRemoveWorkflow, handleSelectAction, handleSelectReaction, isDataEntryModalVisibleAction, setisDataEntryModalVisibleAction, isDataEntryModalVisibleReaction, setisDataEntryModalVisibleReaction, selectedActionId, selectedReactionId
  ] = MyWorkflows();
  // End of import

  // Get Actions
  const [actions, setActions] = Action();
  // End of Get Actions

  // Get Reactions
  const [reactions, setReactions] = Reaction();
  // End of Get Reactions

  const [selectedTab, setSelectedTab] = useState('Workflow');

  const handleTabSelect = (tab) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@storage_Key');
        if (value !== null) {
          setToken(value);
        }
      } catch (e) {
        console.error(e);
      }
    };
    getData();
  }, []);

  const handleDataEntrySubmit = () => {
    const newDataEntry = {
      params: {
        action_data: inputValueAction,
        reaction_data1: inputValueReaction1,
        reaction_data2: inputValueReaction2,
        reaction_data3: inputValueReaction3,
      },
    };

    setInputValues(() => newDataEntry);

    console.log(inputValues);

    // Hide the data entry Modal
    setisDataEntryModalVisibleAction(false);
    setisDataEntryModalVisibleReaction(false);
  };

  const [i, setI] = useState(4);

  const handleCheck = (id) => {
    setSwitchStates({ ...switchStates, [id]: !switchStates[id] });

    let formDataArea;

    const updatedWorkflows = workflows.map((workflow) => {
      if (workflow.id === id) {
        if (switchStates[id] === false || switchStates[id] === undefined) {
          console.log('add area');
          if (selectedActionId === 1 || selectedActionId === 5 || selectedActionId === 6 || selectedActionId === 7 || selectedActionId === 8 || selectedActionId === 12 || selectedActionId === 13) {
            const actionData = {
              1: { adress: inputValues.params.action_data },
              5: { username: inputValues.params.action_data },
              6: { message: inputValues.params.action_data },
              7: { repo_name: inputValues.params.action_data },
              8: { repo_name: inputValues.params.action_data },
              12: { repo_name: inputValues.params.action_data },
              13: { repo_name: inputValues.params.action_data },
            };
            const jsonActionData = JSON.stringify(actionData[selectedActionId]);
            formDataArea = new FormData();
            formDataArea.append('action_id', selectedActionId);
            formDataArea.append('action_data', "'" + jsonActionData + "'");
          } else {
            formDataArea = new FormData();
            formDataArea.append('action_id', selectedActionId);
            formDataArea.append('action_data', "''");
          }
          if (selectedReactionId === 0 || selectedReactionId === 1 || selectedReactionId === 2 || selectedReactionId === 3 || selectedReactionId === 4 || selectedReactionId === 5) {
            const reactionData = {
              0: { adress: inputValues.params.reaction_data1, subject: inputValues.params.reaction_data2, message: inputValues.params.reaction_data3 },
              1: { subject: inputValues.params.reaction_data1, message: inputValues.params.reaction_data2 },
              2: { title: inputValues.params.reaction_data1, content: inputValues.params.reaction_data2, message: inputValues.params.reaction_data3 },
              3: { repo_name: inputValues.params.reaction_data1 },
              4: { repo_name: inputValues.params.reaction_data1, issue: { title: inputValues.params.reaction_data2, body: inputValues.params.reaction_data3 } },
              5: { subject: inputValues.params.reaction_data1, message: inputValues.params.reaction_data2 },
            };
            const jsonReactionData = JSON.stringify(reactionData[selectedReactionId]);
            formDataArea.append('reaction_id', selectedReactionId);
            formDataArea.append('reaction_data', "'" + jsonReactionData + "'");
          } else {
            formDataArea.append('reaction_id', selectedReactionId);
            formDataArea.append('reaction_data', "''");
          }
          console.log(token);
          console.log(url + 'add_area');
          console.log(formDataArea);

          try {
            const data = fetchData(url + 'add_area', {
              method: 'POST',
              headers: {
                'jwt': token,
              },
              body:
                formDataArea
            });
            const json = data;
            console.log(json);
          } catch (error) {
            console.error(error);
          }
        }
        else {
          console.log('remove area');
          var fdata = new FormData();
          fdata.append('area_id', i); // change the id to an auto var
          console.log(i);

          try {
            const data = fetchData(url + 'remove_area', {
              method: 'DELETE',
              headers: {
                'jwt': token,
              },
              body:
                fdata
            });
            const json = data;
            console.log(json);
          } catch (error) {
            console.error(error);
          }
          setI(i + 1);
        }
        return { ...workflow, checked: !workflow.checked };
      }
      return workflow;
    });
    setWorkflows(updatedWorkflows);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header.text}>Area</Text>
        <MySettings navigation={navigation} isDarkMode={isDarkMode} onSwitchChange={handleSwitchChange} />
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => handleTabSelect('Workflow')} style={selectedTab === 'Workflow' ? [styles.selectedTab, { borderBottomLeftRadius: 0, borderBottomRightRadius: 10 }] : styles.tab}>
          <Text style={selectedTab === 'Workflow' ? styles.selectedTabText : styles.tabText}>Workflow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabSelect('Services')} style={selectedTab === 'Services' ? [styles.selectedTab, { borderBottomLeftRadius: 10, borderBottomRightRadius: 0 }] : styles.tab}>
          <Text style={selectedTab === 'Services' ? styles.selectedTabText : styles.tabText}>Services</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {selectedTab === 'Workflow' && workflows.map((workflow) => (
          <View key={workflow.id} style={styles.workflowContainer}>
            <TouchableOpacity onPress={() => handleRemoveWorkflow(workflow.id)}>
              <Icon name="delete" size={28} style={styles.workflowContainer.icon} />
            </TouchableOpacity>

            <Switch
              key={workflow.id}
              value={switchStates[workflow.id]}
              trackColor={styles.switch}
              thumbColor={switchStates[workflow.id] ? 'white' : 'white'}
              style={{ position: 'absolute', right: 0 }}
              onValueChange={() => handleCheck(workflow.id)}
            />

            <View style={styles.workflowButtons}>
              <TouchableOpacity onPress={() => handleClickAction(workflow.id)} style={styles.actionButton}>
                <Text style={styles.actionButton.text}>{workflow.selectedAction}</Text>
                <Icon name="arrow-drop-down" size={24} color="white" style={{ position: 'absolute', right: 0 }} />
              </TouchableOpacity>

              <Icon name="keyboard-arrow-down" size={25} style={styles.actionButton.icon} />

              <Modal
                animationIn='zoomIn'
                animationOut='zoomOut'
                transparent={true}
                backdropOpacity={0.7}
                statusBarTranslucent={true}
                hideModalContentWhileAnimating={true}
                onBackdropPress={() => setIsActionModalVisible({ ...isActionModalVisible, [workflow.id]: false })}
                isVisible={isActionModalVisible[workflow.id] || false}
                onModalHide={() => setIsActionModalVisible({ ...isActionModalVisible, [workflow.id]: false })}
              >
                <View style={styles.popupView}>
                  <View style={styles.popUp}>
                    <FlatList
                      style={{ margin: 20 }}
                      data={actions}
                      renderItem={({ item }) =>
                        <TouchableOpacity style={styles.listItem} onPress={() => {
                          handleSelectAction(workflow.id, item.name, item.id);
                          setIsActionModalVisible({ ...isActionModalVisible, [workflow.id]: false });
                        }}>
                          <Image source={item.logo} style={styles.logoReaction} />
                          <Text style={styles.listItem.text}>{item.name}</Text>
                          <View style={styles.tooltip}>
                            <Tooltip
                              popover={<Text style={{ color: "white" }}>{item.description}</Text>}
                              containerStyle={{ height: 'auto' }}
                              width={200}
                              // backgroundColor="#121212"
                              withOverlay={false}
                            >
                              <Icon name='help' size={13} color="black" />
                            </Tooltip>
                          </View>
                        </TouchableOpacity>}
                    />
                  </View>
                </View>
              </Modal>

              {selectedActionId === 1 && (
                <MyModalEntry
                  isDataEntryModalVisibleAction={isDataEntryModalVisibleAction}
                  setisDataEntryModalVisibleAction={setisDataEntryModalVisibleAction}
                  inputValue={inputValueAction}
                  setInputValue={setinputValueAction}
                  handleDataEntrySubmit={handleDataEntrySubmit}
                  text="Enter an email:"
                  placeholder="exemple@mail.com"
                />
              )}
              {selectedActionId === 5 && (
                <MyModalEntry
                  isDataEntryModalVisibleAction={isDataEntryModalVisibleAction}
                  setisDataEntryModalVisibleAction={setisDataEntryModalVisibleAction}
                  inputValue={inputValueAction}
                  setInputValue={setinputValueAction}
                  handleDataEntrySubmit={handleDataEntrySubmit}
                  text="Enter a username:"
                  placeholder="Exemple#1234"
                />
              )}
              {selectedActionId === 6 && (
                <MyModalEntry
                  isDataEntryModalVisibleAction={isDataEntryModalVisibleAction}
                  setisDataEntryModalVisibleAction={setisDataEntryModalVisibleAction}
                  inputValue={inputValueAction}
                  setInputValue={setinputValueAction}
                  handleDataEntrySubmit={handleDataEntrySubmit}
                  text="Enter a message type:"
                  placeholder="This is a text message"
                />
              )}
              {selectedActionId === 7 && (
                <MyModalEntry
                  isDataEntryModalVisibleAction={isDataEntryModalVisibleAction}
                  setisDataEntryModalVisibleAction={setisDataEntryModalVisibleAction}
                  inputValue={inputValueAction}
                  setInputValue={setinputValueAction}
                  handleDataEntrySubmit={handleDataEntrySubmit}
                  text="Enter a repository name:"
                  placeholder="GithubOwner/RepositoryName"
                />
              )}
              {selectedActionId === 8 && (
                <MyModalEntry
                  isDataEntryModalVisibleAction={isDataEntryModalVisibleAction}
                  setisDataEntryModalVisibleActionReaction={setisDataEntryModalVisibleAction}
                  inputValue={inputValueAction}
                  setInputValue={setinputValueAction}
                  handleDataEntrySubmit={handleDataEntrySubmit}
                  text="Enter a repository name:"
                  placeholder="GithubOwner/RepositoryName"
                />
              )}
              {selectedActionId === 12 && (
                <MyModalEntry
                  isDataEntryModalVisibleAction={isDataEntryModalVisibleAction}
                  setisDataEntryModalVisibleAction={setisDataEntryModalVisibleAction}
                  inputValue={inputValueAction}
                  setInputValue={setinputValueAction}
                  handleDataEntrySubmit={handleDataEntrySubmit}
                  text="Enter a repository name:"
                  placeholder="GithubOwner/RepositoryName"
                />
              )}
              {selectedActionId === 13 && (
                <MyModalEntry
                  isDataEntryModalVisibleAction={isDataEntryModalVisibleAction}
                  setisDataEntryModalVisibleAction={setisDataEntryModalVisibleAction}
                  inputValue={inputValueAction}
                  setInputValue={setinputValueAction}
                  handleDataEntrySubmit={handleDataEntrySubmit}
                  text="Enter a repository name:"
                  placeholder="GithubOwner/RepositoryName"
                />
              )}

              <TouchableOpacity onPress={() => handleClickReaction(workflow.id)} style={styles.actionButton}>
                <Text style={styles.actionButton.text}>{workflow.selectedReaction}</Text>
                <Icon name="arrow-drop-down" size={24} color="white" style={{ position: 'absolute', right: 0 }} />
              </TouchableOpacity>

              <Modal
                animationIn='zoomIn'
                animationOut='zoomOut'
                transparent={true}
                backdropOpacity={0.7}
                statusBarTranslucent={true}
                hideModalContentWhileAnimating={true}
                onBackdropPress={() => setIsReactionModalVisible({ ...isReactionModalVisible, [workflow.id]: false })}
                isVisible={isReactionModalVisible[workflow.id] || false}
                onModalHide={() => setIsReactionModalVisible({ ...isReactionModalVisible, [workflow.id]: false })}
              >
                <View style={styles.popupView}>
                  <View style={styles.popUp}>
                    <FlatList
                      style={{ margin: 20 }}
                      data={reactions}
                      renderItem={({ item }) =>
                        <TouchableOpacity style={styles.listItem} onPress={() => {
                          handleSelectReaction(workflow.id, item.name, item.id);
                          setIsReactionModalVisible({ ...isReactionModalVisible, [workflow.id]: false });
                        }}>
                          <Image source={item.logo} style={styles.logoReaction} />
                          <Text style={styles.listItem.text}>{item.name}</Text>
                          <View style={styles.tooltip}>
                            <Tooltip
                              popover={<Text style={{ color: "white" }}>{item.description}</Text>}
                              containerStyle={{ height: 'auto' }}
                              width={200}
                              // backgroundColor="#121212"
                              withOverlay={false}
                            >
                              <Icon name='help' size={13} color="black" />
                            </Tooltip>
                          </View>
                        </TouchableOpacity>}
                    />
                  </View>
                </View>
              </Modal>

              {selectedReactionId === 0 && (
                <MyModalEntryReaction0
                  isDataEntryModalVisibleReaction={isDataEntryModalVisibleReaction}
                  setIsDataEntryModalVisibleReaction={setisDataEntryModalVisibleReaction}
                  inputValue1={inputValueReaction1}
                  inputValue2={inputValueReaction2}
                  inputValue3={inputValueReaction3}
                  setInputValue1={setInputValueReaction1}
                  setInputValue2={setInputValueReaction2}
                  setInputValue3={setInputValueReaction3}
                  handleDataEntrySubmit={() => handleDataEntrySubmit(workflow.id)}
                />
              )}
              {selectedReactionId === 1 && (
                <MyModalEntryReaction1
                  isDataEntryModalVisibleReaction={isDataEntryModalVisibleReaction}
                  setIsDataEntryModalVisibleReaction={setisDataEntryModalVisibleReaction}
                  inputValue1={inputValueReaction1}
                  inputValue2={inputValueReaction2}
                  setInputValue1={setInputValueReaction1}
                  setInputValue2={setInputValueReaction2}
                  handleDataEntrySubmit={handleDataEntrySubmit}
                />
              )}
              {selectedReactionId === 2 && (
                <MyModalEntryReaction2
                  isDataEntryModalVisibleReaction={isDataEntryModalVisibleReaction}
                  setIsDataEntryModalVisibleReaction={setisDataEntryModalVisibleReaction}
                  inputValue1={inputValueReaction1}
                  inputValue2={inputValueReaction2}
                  setInputValue1={setInputValueReaction1}
                  setInputValue2={setInputValueReaction2}
                  handleDataEntrySubmit={handleDataEntrySubmit}
                />
              )}
              {selectedReactionId === 3 && (
                <MyModalEntryReaction3
                  isDataEntryModalVisibleReaction={isDataEntryModalVisibleReaction}
                  setIsDataEntryModalVisibleReaction={setisDataEntryModalVisibleReaction}
                  inputValue1={inputValueReaction1}
                  setInputValue1={setInputValueReaction1}
                  handleDataEntrySubmit={handleDataEntrySubmit}
                />
              )}
              {selectedReactionId === 4 && (
                <MyModalEntryReaction4
                  isDataEntryModalVisibleReaction={isDataEntryModalVisibleReaction}
                  setIsDataEntryModalVisibleReaction={setisDataEntryModalVisibleReaction}
                  inputValue1={inputValueReaction1}
                  inputValue2={inputValueReaction2}
                  inputValue3={inputValueReaction3}
                  setInputValue1={setInputValueReaction1}
                  setInputValue2={setInputValueReaction2}
                  setInputValue3={setInputValueReaction3}
                  handleDataEntrySubmit={handleDataEntrySubmit}
                />
              )}
              {selectedReactionId === 5 && (
                <MyModalEntryReaction2
                  isDataEntryModalVisibleReaction={isDataEntryModalVisibleReaction}
                  setIsDataEntryModalVisibleReaction={setisDataEntryModalVisibleReaction}
                  inputValue1={inputValueReaction1}
                  inputValue2={inputValueReaction2}
                  setInputValue1={setInputValueReaction1}
                  setInputValue2={setInputValueReaction2}
                  handleDataEntrySubmit={handleDataEntrySubmit}
                />
              )}
            </View>
          </View>
        ))}
        {selectedTab === 'Workflow' && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddWorkflow}>
            <Text style={styles.addButton.text}>Add workflow</Text>
          </TouchableOpacity>
        )}
        {selectedTab === 'Services' && (
          <ServicesOAuth isDarkMode={isDarkMode} />
        )}
      </ScrollView>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
    </SafeAreaView>
  );
};
