import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>FixIt</Text>
          <Text style={styles.subtitle}>Professional Home Services</Text>
          <Text style={styles.description}>
            Connect with trusted local service providers for all your home maintenance needs
          </Text>
        </View>

        <View style={styles.features}>
          <View style={styles.feature}>
            <Text style={styles.featureTitle}>Trusted Professionals</Text>
            <Text style={styles.featureText}>Verified and rated service providers</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureTitle}>Easy Booking</Text>
            <Text style={styles.featureText}>Schedule services at your convenience</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureTitle}>Transparent Pricing</Text>
            <Text style={styles.featureText}>No hidden fees, upfront pricing</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.getStartedButton}
          onPress={() => navigation.replace("MainTabs")}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
      },
      content: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'space-between',
        paddingTop: 60,
        paddingBottom: 40,
      },
});
