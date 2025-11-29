import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HistoryScreen() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const data = JSON.parse(await AsyncStorage.getItem("fixit_bookings")) || [];
      setBookings(data);
    } catch (error) {
      console.log("Error loading bookings:", error);
    }
  };

  const cancelBooking = async (id) => {
    Alert.alert(
      "Cancel Booking",
      "Are you sure you want to cancel this booking?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            let updated = bookings.map((b) =>
              b.id === id ? { ...b, status: "Cancelled" } : b
            );
            setBookings(updated);
            await AsyncStorage.setItem("fixit_bookings", JSON.stringify(updated));
          }
        }
      ]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Requested": return "#f39c12";
      case "Confirmed": return "#27ae60";
      case "Cancelled": return "#e74c3c";
      case "Completed": return "#95a5a6";
      default: return "#7f8c8d";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Booking History</Text>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {bookings.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No bookings yet</Text>
            <Text style={styles.emptySubtext}>Your booking history will appear here</Text>
          </View>
        ) : (
          bookings.map((booking) => (
            <View key={booking.id} style={styles.bookingCard}>
              <View style={styles.bookingHeader}>
                <Text style={styles.providerName}>{booking.providerName}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) }]}>
                  <Text style={styles.statusText}>{booking.status}</Text>
                </View>
              </View>
              
              <Text style={styles.bookingDate}>{booking.date} • {booking.slot}</Text>
              <Text style={styles.bookingPrice}>₹{booking.price}</Text>
              
              {booking.notes && (
                <Text style={styles.notes}>Notes: {booking.notes}</Text>
              )}
              
              {booking.status === "Requested" && (
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => cancelBooking(booking.id)}
                >
                  <Text style={styles.cancelText}>Cancel Booking</Text>
                </TouchableOpacity>
              )}
            </View>
          ))
        )}
      </ScrollView>
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
  emptyState: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#bdc3c7',
  },
  bookingCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  providerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  bookingDate: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  bookingPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27ae60',
    marginBottom: 8,
  },
  notes: {
    fontSize: 14,
    color: '#7f8c8d',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  cancelText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
