import requests
from bs4 import BeautifulSoup
import numpy as np
from pymongo import MongoClient

# MongoDB connection settings
mongo_uri = 'mongodb://127.0.0.1:27017/'  # Replace with your MongoDB URI
database_name = 'clinical-medics'  # Replace with your database name
collection_name = 'ScrappedMedicine'  # Replace with your collection name

# Establish connection to MongoDB
client = MongoClient(mongo_uri)
database = client[database_name]
collection = database[collection_name]

url = "https://dawaai.pk/all-medicines/a"
daawai_r1 = requests.get(url)

if daawai_r1.status_code == 200:
    print("The data has been fetched")
else:
    print("Failed to fetch the data")

mainPage = daawai_r1.content
soup_daawai = BeautifulSoup(mainPage, 'html5lib')

all_medicine_Details = soup_daawai.find_all('h2')
all_medicine_Prices = soup_daawai.find_all('h4')

print("Printing all medicine details.")

# Scraping number of medicines
number_Of_Medicines = 50

# Empty lists
medicine_Title = []
medicine_Price_List = []
medicine_Link = []
medicine_Description_List = []

for n in np.arange(1, number_Of_Medicines):
    all_medicines = all_medicine_Details[n].find('a')
    link = None  # Initialize link with a default value

    if all_medicines is not None:
        # Getting the links of the medicines
        link = all_medicines['href']
        medicine_Link.append(link)
    
    # medicine prices
    element2 = all_medicine_Prices[n]

    if element2 is not None:
        # Getting the medicine prices
        # Exclude the text within <span> tags
        for span_tag in element2.find_all('span'):
            span_tag.decompose()

        price = element2.text.strip()
        medicine_Price_List.append(price)

        # Getting inside the medicine link
        if link is not None:
            medicine_link = requests.get(link)
            medicine_Page = medicine_link.content
            soup_Medicine_Page = BeautifulSoup(medicine_Page, 'html5lib')

            # Getting the names of the medicines
            medicine_Name_Div = soup_Medicine_Page.find('div', {'class': 'flex-row d-flex-center'})
            name_h1 = medicine_Name_Div.find('h1')
            medicine_Name = name_h1.get_text()
            medicine_Title.append(medicine_Name)

            # Getting the description of the medicine
            medicine_Description_Section = soup_Medicine_Page.find('div', {'class': 'column col-8 py-30 product-side-tabs content'})
            
            if medicine_Description_Section is not None:
                description_p_tag = medicine_Description_Section.find('p')
                
                if description_p_tag is not None:
                    medicine_Description = description_p_tag.get_text()
                    medicine_Description_List.append(medicine_Description)
                else:
                    medicine_Description_List.append("No description found.")
            else:
                print("Medicine description section not found.")

# Create a list of dictionaries for each medicine
medicine_data = []
for i in range(len(medicine_Title)):
    medicine_dict = {
        'Name': medicine_Title[i],
        'Price': medicine_Price_List[i],
        'Description': medicine_Description_List[i],
        'Link': medicine_Link[i]
    }
    medicine_data.append(medicine_dict)

# Insert the data into MongoDB collection
collection.insert_many(medicine_data)

print("The data has been imported to your MongoDB database.")