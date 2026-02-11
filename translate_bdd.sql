#!/bin/bash

# Define the app name
APP_NAME="equipements"

# Create a mapping of model names to the corresponding table names
declare -A model_to_table=(
    [Product]="products"
    [ProductSports]="product_sports"
    [ProductLevels]="product_levels"
    [ProductFeatures]="product_features"
    [ProductImages]="product_images"
    [ProductStoreStock]="product_store_stock"
)

# Input and output file
INPUT_FILE="seed_products.sql"
OUTPUT_FILE="seed_products_updated.sql"

# Copy the input file to the output file
cp "$INPUT_FILE" "$OUTPUT_FILE"

# Loop through the mapping and perform the substitutions
for model in "${!model_to_table[@]}"; do
    table_name="${model_to_table[$model]}"
    sed -i "s/$model/$APP_NAME_$table_name/g" "$OUTPUT_FILE"
done
