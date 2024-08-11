import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function PressableBut({ label, theme, onPress }) {
  if (theme === "primary") {
    return (
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={onPress}
        >
          <FontAwesome
            name="picture-o"
            size={18}
            color="#25292e"
            style={styles.buttonIcon}
          />
          <Text style={[styles.buttonLabel, { color: "#25292e" }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => alert('You pressed a button.')}>
          <Text style={styles.buttonLabel}>{label}</Text>
        </Pressable>
      </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 10,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderRadius: 18,
    padding: 10,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonLabel: {
    color: '#25292e',
    fontSize: 18,
  },
});