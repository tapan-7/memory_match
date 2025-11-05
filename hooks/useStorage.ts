import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const useStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T) => Promise<void>] => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    loadStoredValue();
  }, []);

  const loadStoredValue = async () => {
    try {
      const item = await AsyncStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.log("Error loading from storage:", error);
    }
  };

  const setValue = async (value: T) => {
    try {
      setStoredValue(value);
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log("Error saving to storage:", error);
    }
  };

  return [storedValue, setValue];
};
