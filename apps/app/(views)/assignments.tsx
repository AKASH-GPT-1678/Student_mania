import React, { useState } from "react";
import {
    View,
    Text,
    Modal,
    TextInput,
    Pressable,
    FlatList,
    ActivityIndicator,
} from "react-native";
import SafeScreenWrapper from "../wrapper/safescreenwrapper";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { ENV } from "../utils/ENV";
import { useGetAxios } from "../utils/getaxios";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import useFetch from "../hooks/loadClass";
import { Picker } from '@react-native-picker/picker';
export const TASK_STATUS = [
  {
    id: 1,
    label: "Pending",
    value: "pending",
    color: "#facc15", // yellow
  },
  {
    id: 2,
    label: "In Progress",
    value: "in_progress",
    color: "#3b82f6", // blue
  },
  {
    id: 3,
    label: "On Hold",
    value: "on_hold",
    color: "#f97316", // orange
  },
  {
    id: 4,
    label: "Completed",
    value: "completed",
    color: "#22c55e", // green
  },
  {
    id: 5,
    label: "Cancelled",
    value: "cancelled",
    color: "#ef4444", // red
  },
];

const SubjectTasks = () => {
    const { token } = useSelector((state: RootState) => state.user); // example selector
    const [showModal, setShowModal] = useState(false);
    const [newTask, setNewTask] = useState("");
    const [loadingCreate, setLoadingCreate] = useState(false);
    const [currentStatus, setCurrentStatus] = useState('');

    // Load all tasks using useFetch or your custom axios hook
    const fetchTasks = async () => {
        const res = await axios.get(`${ENV.BASE_URL}/api/tasks`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    };

    const { data: tasks, loading } = useFetch(fetchTasks, true);

    // Handle creating new task
    const handleCreateTask = async () => {
        if (!newTask.trim()) return;
        try {
            setLoadingCreate(true);
            await axios.post(
                `${ENV.BASE_URL}/api/tasks`,
                { title: newTask },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            setShowModal(false);
            setNewTask("");
            //   (); // reload tasks after creation
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingCreate(false);
        }
    };

    return (
        <SafeScreenWrapper>
            <View className="flex-1 p-4">
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-2xl font-bold text-black">Subject Tasks</Text>
                    <Pressable
                        className="bg-blue-700 px-4 py-2 rounded-lg"
                        onPress={() => setShowModal(true)}
                    >
                        <Text className="text-white text-lg font-semibold">+ Add</Text>
                    </Pressable>
                </View>

                {loading ? (
                    <View className="flex-1 justify-center items-center">
                        <ActivityIndicator size="large" color="#007AFF" />
                        <Text className="text-gray-600 mt-2">Loading tasks...</Text>
                    </View>
                ) : tasks && tasks.length > 0 ? (
                    <FlatList
                        data={tasks}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View className="bg-white p-4 mb-3 rounded-2xl shadow-sm border border-gray-200">
                                <View className="flex-row items-center">
                                    <Feather
                                        name="check-square"
                                        size={24}
                                        color="#007AFF"
                                        style={{ marginRight: 10 }}
                                    />
                                    <View className="flex-1">
                                        <Text className="text-lg font-semibold text-black">
                                            {item.title}
                                        </Text>
                                        <Text className="text-gray-500 mt-1">
                                            {item.description || "No description provided."}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    />
                ) : (
                    <View className="flex-1 justify-center items-center">
                        <Text className="text-gray-600 text-lg">No tasks found.</Text>
                    </View>
                )}

                {/* ➕ Modal for creating new task */}
                <Modal
                    visible={showModal}
                    transparent
                    animationType="slide"
                    onRequestClose={() => setShowModal(false)}
                >
                    <View className="flex-1 bg-black/40 justify-center items-center">
                        <View className="bg-white w-11/12 rounded-2xl p-5">
                            <Text className="text-2xl font-bold text-black mb-4">
                                Create New Task
                            </Text>
                            <TextInput
                                placeholder="Enter task title..."
                                value={newTask}
                                onChangeText={setNewTask}
                                className="border border-gray-300 rounded-xl p-3 text-base"
                            />
                            <TextInput
                                placeholder="Enter task Description..."
                                value={newTask}
                                numberOfLines={3}
                                onChangeText={setNewTask}
                                className="border border-gray-300 rounded-xl p-3 text-base mt-5"
                            />


                            <Picker
                                selectedValue={currentStatus}
                                onValueChange={(itemValue) => setCurrentStatus(itemValue)}
                                className="px-6 border-zinc-100"
                            >
                                {TASK_STATUS.map((category, index) => (
                                    <Picker.Item
                                        key={index}
                                        label={category.label}
                                        value={category.value}

                                    />
                                ))}
                            </Picker>





                            <View className="flex-row justify-end mt-5">
                                <Pressable
                                    className="bg-gray-400 px-4 py-2 rounded-lg mr-2"
                                    onPress={() => setShowModal(false)}
                                >
                                    <Text className="text-white font-semibold">Cancel</Text>
                                </Pressable>
                                <Pressable
                                    className={`px-4 py-2 rounded-lg ${loadingCreate ? "bg-gray-400" : "bg-blue-700"
                                        }`}
                                    disabled={loadingCreate}
                                    onPress={handleCreateTask}
                                >
                                    {loadingCreate ? (
                                        <ActivityIndicator color="#fff" />
                                    ) : (
                                        <Text className="text-white font-semibold">Create</Text>
                                    )}
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeScreenWrapper>
    );
};

export default SubjectTasks;
