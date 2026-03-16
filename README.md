# n8n Geo Distance Automation

Automação em Node.js para cálculo de distância geográfica entre coordenadas a partir de arquivos CSV.

## Objective

Process datasets containing latitude and longitude and automatically calculate the distance between two points using the Haversine formula.

## Technologies

- Node.js
- CSV data processing
- Geolocation calculation
- n8n workflow automation

## Project Structure

data/ → input CSV files  
src/ → automation script  
output/ → generated files  

## How to run

Clone the repository and run the script:

```bash
node src/calculateDistance.js
```

### Input dataset

The script reads the dataset from:

data/clientes.csv

### Output

The processed dataset will be generated in:

output/

Author

Patrick Hermann
