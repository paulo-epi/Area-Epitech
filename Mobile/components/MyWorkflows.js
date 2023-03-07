import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Switch, TouchableOpacity, FlatList, Modal, Image } from 'react-native';

const MyWorkflows = () => {
  const [workflows, setWorkflows] = useState([]);
  const [isActionModalVisible, setIsActionModalVisible] = useState({});
  const [isReactionModalVisible, setIsReactionModalVisible] = useState({});
  const [selectedActionId, setSelectedActionId] = useState(null);
  const [selectedReactionId, setSelectedReactionId] = useState(null);
  const [isDataEntryModalVisibleAction, setisDataEntryModalVisibleAction] = useState({});
  const [isDataEntryModalVisibleReaction, setisDataEntryModalVisibleReaction] = useState({});

  const handleAddWorkflow = () => {
    setWorkflows([
      { id: Date.now(), actions: [], reactions: [], checked: false, selectedAction: "Actions", selectedReaction: "Réactions", actionId: [], reactionId: [] },
      ...workflows
    ]);
  };

  const handleClickAction = (id) => {
    setIsActionModalVisible({ ...isActionModalVisible, [id]: true });
  };

  const handleClickReaction = (id) => {
    setIsReactionModalVisible({ ...isReactionModalVisible, [id]: true });
  };

  const handleRemoveWorkflow = (id) => {
    const updatedWorkflows = workflows.filter((workflow) => workflow.id !== id);
    setWorkflows(updatedWorkflows);
  };

  const handleSelectAction = (id, name, actionId) => {
    setWorkflows(workflows.map(workflow => {
      if (workflow.id === id) {
        setisDataEntryModalVisibleAction(true);
        setSelectedActionId(actionId);
        return { ...workflow, selectedAction: name, actionId: actionId };
      }
      return workflow;
    }));
  };

  const handleSelectReaction = (id, name, reactionId) => {
    setWorkflows(workflows.map(workflow => {
      if (workflow.id === id) {
        setisDataEntryModalVisibleReaction(true);
        setSelectedReactionId(reactionId);
        return { ...workflow, selectedReaction: name, reactionId: reactionId };
      }
      return workflow;
    }));
  };

  return [
    workflows,
    setWorkflows,
    isActionModalVisible,
    setIsActionModalVisible,
    isReactionModalVisible,
    setIsReactionModalVisible,
    handleAddWorkflow,
    handleClickAction,
    handleClickReaction,
    handleRemoveWorkflow,
    handleSelectAction,
    handleSelectReaction,
    isDataEntryModalVisibleAction,
    setisDataEntryModalVisibleAction,
    isDataEntryModalVisibleReaction,
    setisDataEntryModalVisibleReaction,
    selectedActionId,
    selectedReactionId
  ];
};

export default MyWorkflows;