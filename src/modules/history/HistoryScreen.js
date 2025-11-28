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
      header: {
        alignItems: 'center',
        marginBottom: 60,
      },
      title: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 8,
      },
      subtitle: {
        fontSize: 20,
        color: '#3498db',
        fontWeight: '600',
        marginBottom: 16,
      },
      description: {
        fontSize: 16,
        color: '#7f8c8d',
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 20,
      },
      features: {
        flex: 1,
        justifyContent: 'center',
      },
      feature: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
      featureTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 8,
      },
      featureText: {
        fontSize: 14,
        color: '#7f8c8d',
        lineHeight: 20,
      },
      getStartedButton: {
        backgroundColor: '#3498db',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 20,
      },
      getStartedText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
      }
});
