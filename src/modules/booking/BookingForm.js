import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BookingForm({ route, navigation }) {
  const { provider } = route.params;
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("Morning");
  const [notes, setNotes] = useState("");

  const slots = ["Morning", "Afternoon", "Evening"];

  const saveBooking = async () => {
    if (!date) {
      Alert.alert("Error", "Please select a date");
      return;
    }  

    try {
      let stored = await AsyncStorage.getItem("fixit_bookings");
      let bookings = stored ? JSON.parse(stored) : [];
      
      bookings.push({
        id: Date.now(),
        providerId: provider.id,
        providerName: provider.name,
        date,
        slot,
        notes,
        status: "Requested",
        price: provider.price
      });
      
      await AsyncStorage.setItem("fixit_bookings", JSON.stringify(bookings));
      Alert.alert("Success", "Booking confirmed!", [
        { text: "OK", onPress: () => navigation.navigate("MainTabs", { screen: "History" }) }
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to save booking");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Book Service</Text>
      
      <View style={styles.providerInfo}>
        <Text style={styles.providerName}>{provider.name}</Text>
        <Text style={styles.providerPrice}>₹{provider.price}</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Select Date</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={date}
          onChangeText={setDate}
        />

        <Text style={styles.label}>Time Slot</Text>
        <View style={styles.slotContainer}>
          {slots.map((s) => (
            <TouchableOpacity
              key={s}
              style={[styles.slotButton, slot === s && styles.selectedSlot]}
              onPress={() => setSlot(s)}
            >
              <Text style={[styles.slotText, slot === s && styles.selectedSlotText]}>
                {s}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Additional Notes</Text>
        <TextInput
          style={[styles.input, styles.notesInput]}
          placeholder="Any special requirements..."
          value={notes}
          onChangeText={setNotes}
          multiline
        />

        <TouchableOpacity style={styles.confirmButton} onPress={saveBooking}>
          <Text style={styles.confirmText}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
  },
  providerInfo: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  providerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
  },
  providerPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  form: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  notesInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  slotContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  slotButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginRight: 8,
    alignItems: 'center',
  },
  selectedSlot: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  slotText: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  selectedSlotText: {
    color: '#fff',
    fontWeight: '600',
  },
  confirmButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto',
  },
  confirmText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});