import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const data = [
  {
    level: "L1",
    color: "#004D99",
    tasks: [
      { assignedTo: "Assigned to", itemName: "Item Name", partyName: "Party Name", quantity: "Quantity", priority: "Priority" },
      { assignedTo: "Assigned to", itemName: "Item Name", partyName: "Party Name", quantity: "Quantity", priority: "Priority" },
      { assignedTo: "Assigned to", itemName: "Item Name", partyName: "Party Name", quantity: "Quantity", priority: "Priority" },
    ],
  },
  {
    level: "L2",
    color: "#FF7043",
    tasks: [
      { assignedTo: "Assigned to", itemName: "Item Name", partyName: "Party Name", quantity: "Quantity", priority: "Priority" },
      { assignedTo: "Assigned to", itemName: "Item Name", partyName: "Party Name", quantity: "Quantity", priority: "Priority" },
    ],
  },
  {
    level: "L3",
    color: "#004D99",
    tasks: [
      { assignedTo: "Assigned to", itemName: "Item Name", partyName: "Party Name", quantity: "Quantity", priority: "Priority" },
      { assignedTo: "Assigned to", itemName: "Item Name", partyName: "Party Name", quantity: "Quantity", priority: "Priority" },
      { assignedTo: "Assigned to", itemName: "Item Name", partyName: "Party Name", quantity: "Quantity", priority: "Priority" },
      { assignedTo: "Assigned to", itemName: "Item Name", partyName: "Party Name", quantity: "Quantity", priority: "Priority" },
    ],
  },
];

const TodayTaskScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.backArrow}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Today's task</Text>
        <TouchableOpacity>
          <Text style={styles.checkMark}>✔</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {data.map((section, index) => (
          <View key={index} style={[styles.sectionContainer, { backgroundColor: section.color }]}>
            <Text style={styles.levelText}>{section.level}</Text>
            <View style={styles.taskList}>
              {section.tasks.map((task, idx) => (
                <View key={idx} style={styles.taskCard}>
                  <View style={styles.taskRow}>
                    <Text style={styles.taskLabel}>{task.assignedTo}</Text>
                    <Text style={styles.taskValue}>{task.itemName}</Text>
                    <Text style={styles.taskValue}>{task.quantity}</Text>
                  </View>
                  <View style={styles.taskRow}>
                    <Text style={styles.taskLabel}>{task.partyName}</Text>
                    <Text style={styles.taskValue}>{task.priority}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  backArrow: {
    fontSize: 20,
    color: "#000",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  checkMark: {
    fontSize: 20,
    color: "#000",
  },
  sectionContainer: {
    marginVertical: 10,
    borderRadius: 10,
    padding: 10,
  },
  levelText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  taskList: {
    backgroundColor: "#E6F7FF",
    borderRadius: 10,
    padding: 10,
  },
  taskCard: {
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
  },
  taskRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  taskLabel: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
  },
  taskValue: {
    fontSize: 14,
    color: "#666",
  },
});

export default TodayTaskScreen;
