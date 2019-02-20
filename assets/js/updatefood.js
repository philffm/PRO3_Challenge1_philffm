function updatefood() {
    if (foodTokens >= 0) {
        currentFood = randomarray(food);
        foodTokens -= 1;
        checktokens();
        updatespacecraftvalues();
    }
}
