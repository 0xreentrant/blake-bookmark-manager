#!/bin/bash

# Loop over all files named slide<NUMBER>.png in the current directory
for file in slide*.png; do
  # Define the output file name (you can modify this if needed)
  output_file="$file"

  # Get the original dimensions of the image
  dimensions=$(identify -format "%wx%h" "$file")
  width=$(echo $dimensions | cut -d'x' -f1)
  height=$(echo $dimensions | cut -d'x' -f2)

  # Calculate the new dimensions after cropping
  new_width=$((width - 21))
  new_height=$((height - 142))

  # Perform the crop operation with ImageMagick
  convert "$file" -crop "${new_width}x${new_height}+4+142" "$output_file"

  echo "Processed $file -> $output_file"
done
