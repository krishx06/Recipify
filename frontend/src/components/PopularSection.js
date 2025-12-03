import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";


const POPULAR = [
  {
    id: "pop1",
    title: "Chicken Biryani",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpY2tlbiUyMGJpcnlhbml8ZW58MHx8MHx8fDA%3D",
    time: "55 Min",
    cuisine: "Indian",
    veg: false,
    description:
      "Aromatic basmati rice layered with spiced chicken, slow-cooked to perfection.",
  },
  {
    id: "pop2",
    title: "Paneer Butter Masala",
    image: "https://www.vegrecipesofindia.com/wp-content/uploads/2020/01/paneer-butter-masala-5.jpg",
    time: "35 Min",
    cuisine: "North Indian",
    veg: true,
    description:
      "Soft paneer cubes cooked in a rich and creamy tomato gravy.",
  },
  {
    id: "pop3",
    title: "Butter Chicken",
    image: "https://www.chompslurrpburp.com/wp-content/uploads/2022/11/butter-chicken-2.jpg",
    time: "40 Min",
    cuisine: "North Indian",
    veg: false,
    description:
      "Creamy, mildly spiced chicken curry popular across India.",
  },
  {
    id: "pop4",
    title: "Masala Dosa",
    image: "https://themagicsaucepan.com/wp-content/uploads/2014/04/13836129345_fa4e182b83_b-2.jpg",
    time: "30 Min",
    cuisine: "South Indian",
    veg: true,
    description:
      "Crispy fermented rice dosa filled with spiced potato masala.",
  },
  {
    id: "pop5",
    title: "Chole Bhature",
    image: "https://b.zmtcdn.com/data/pictures/chains/1/21069601/69d68beaa717415a98b5d077f93445c2.png",
    time: "45 Min",
    cuisine: "Punjabi",
    veg: true,
    description:
      "Spicy chickpea curry served with fluffy deep-fried bhature.",
  },
  {
    id: "pop6",
    title: "Pav Bhaji",
    image: "https://images.pexels.com/photos/5410400/pexels-photo-5410400.jpeg?cs=srgb&dl=pexels-saveurssecretes-5410400.jpg&fm=jpg",
    time: "30 Min",
    cuisine: "Street Food",
    veg: true,
    description:
      "Butter-loaded mashed vegetable curry served with toasted pav.",
  },
  {
    id: "pop7",
    title: "Fried Rice & Manchurian",
    image: "https://i.ytimg.com/vi/KSmI5jkBQFw/maxresdefault.jpg",
    time: "25 Min",
    cuisine: "Indo-Chinese",
    veg: true,
    description:
      "Classic Indo-Chinese combo with spicy fried rice and crispy manchurian.",
  },
  {
    id: "pop8",
    title: "Veg Fried Momos",
    image: "https://img.clevup.in/272541/SKU-1146_0-1721288672638.jpg?width=600&format=webp",
    time: "20 Min",
    cuisine: "Tibetan / Street Food",
    veg: true,
    description:
      "Steamed dumplings filled with vegetables or chicken, served with spicy chutney.",
  },
  {
    id: "pop9",
    title: "Paneer Tikka Pizza",
    image: "https://i.pinimg.com/564x/76/42/b9/7642b9241623cf0363eeff86b4ade51e.jpg",
    time: "20 Min",
    cuisine: "Italian / Fusion",
    veg: true,
    description:
      "Crispy pizza topped with paneer tikka, veggies, and Indian-style flavors.",
  },
  {
    id: "pop10",
    title: "Gulab Jamun",
    image: "https://www.whiskaffair.com/wp-content/uploads/2019/05/Gajar-Ka-Halwa-2-3.jpg",
    time: "25 Min",
    cuisine: "Indian Dessert",
    veg: true,
    description:
      "Soft deep-fried milk dumplings soaked in cardamom sugar syrup.",
  },
];

export default function PopularSection({ navigation }) {
  function openRecipe(item) {
    navigation.navigate("RecipeDetails", { recipe: item });
  }

  return (
    <View style={{ marginTop: 30 }}>
      <Text style={styles.heading}>Popular Recipes</Text>

      {POPULAR.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.shadowWrapper}
          activeOpacity={0.85}
          onPress={() => openRecipe(item)}
        >
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.textWrap}>
              <View style={styles.rowBetween}>
                <Text style={styles.title}>{item.title}</Text>

                <View style={styles.vegRow}>
                  <View
                    style={[
                      styles.vegDot,
                      { backgroundColor: item.veg ? "#2ecc71" : "#e74c3c" }
                    ]}
                  />
                  <Text style={styles.vegText}>{item.veg ? "Veg" : "Non-Veg"}</Text>
                </View>
              </View>

              <View style={styles.row}>
                <Text style={styles.time}>{item.time}</Text>
                <Text style={styles.dot}>•</Text>
                <Text style={styles.cuisine}>{item.cuisine}</Text>
              </View>
            </View>


          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 26,
    fontFamily: "TransformaSemiBold",
    marginBottom: 18,
    textShadowColor: "#6b6b6b8e",
    textShadowOffset: { width: 1, height: 3 },
    textShadowRadius: 4
  },
  shadowWrapper: {
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    borderRadius: 18,
    marginBottom: 18,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    overflow: "hidden",
    borderColor: "#0000004a",
    borderWidth: 0.5,
  },
  image: {
    width: "100%",
    height: 220,
    resizeMode: "cover",
  },
  textWrap: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: "TransformaSemiBold",
    fontSize: 18,
    color: "#111",
  },
  time: {
    fontFamily: "LatoRegular",
    color: "#666",
    fontSize: 13,
  },
  row: {
  flexDirection: "row",
  alignItems: "center",
  marginTop: 4,
  gap: 6,
},

dot: {
  fontSize: 14,
  color: "#777",
},

cuisine: {
  fontFamily: "LatoRegular",
  fontSize: 13,
  color: "#666",
},

rowBetween: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
},

vegRow: {
  flexDirection: "row",
  alignItems: "center",
  gap: 4,
},

vegDot: {
  width: 12,
  height: 12,
  borderRadius: 6,
},

vegText: {
  fontSize: 13,
  fontFamily: "LatoBold",
  color: "#444",
},


});
