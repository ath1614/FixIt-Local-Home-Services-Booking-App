import { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { providers } from "../../data/providers";
import ProviderCard from "../providers/ProviderCard";

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const favProviders = providers.filter(p => p.fav);
    setFavorites(favProviders);
  };

  const handleBook = (provider) => {
    navigation.navigate("BookingForm", { provider });
  };

  const toggleFavorite = (providerId) => {
    // In a real app, this would update the provider's favorite status
    console.log("Toggle favorite for provider:", providerId);
  };

    return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Favorite Providers</Text>
      
      {favorites.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No favorites yet</Text>
          <Text style={styles.emptySubtext}>
            Add providers to favorites by tapping the star icon
          </Text>
        </View>
      ) : (
        <>
          <Text style={styles.subtitle}>{favorites.length} favorite providers</Text>
          <FlatList
            data={favorites}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ProviderCard
                item={item}
                onBook={() => handleBook(item)}
                onFav={() => toggleFavorite(item.id)}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#bdc3c7',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});