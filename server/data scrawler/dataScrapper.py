import requests
from bs4 import BeautifulSoup
import numpy as np
import pandas as pd

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
        #print("The link of the medicine", n, "is:")
       # print(link)
    
# medicine prices    
    element2 = all_medicine_Prices[n]
    
    if element2 is not None:
       # Getting the medicine prices
       
        # Exclude the text within <span> tags
        for span_tag in element2.find_all('span'):
            span_tag.decompose()

        price = element2.text.strip()
        medicine_Price_List.append(price)
        #print("Printing the Price of medicine #", n)
        # print(price)
        
# Getting inside the medicine link
        if link is not None:
            medicine_link = requests.get(link)
            medicine_Page = medicine_link.content
            soup_Medicine_Page = BeautifulSoup(medicine_Page, 'html5lib')
            

# Getting the names of the medicines
            medicine_Name_Div = soup_Medicine_Page.find('div', {'class': 'flex-row d-flex-center'})
            name_h1 = medicine_Name_Div.find('h1')
            medicine_Name = name_h1.get_text()
            #print("Printing the names of the Medicines.")
            medicine_Title.append(medicine_Name)
           # print(medicine_Name)
            
# Getting the description of the medicine
            medicine_Description_Section = soup_Medicine_Page.find('div', {'class': 'column col-8 py-30 product-side-tabs content'})
            
            if medicine_Description_Section is not None:
                description_p_tag = medicine_Description_Section.find('p')
                
                if description_p_tag is not None:
                    medicine_Description = description_p_tag.get_text()
                   # print("Printing the description of the medicine")
                    medicine_Description_List.append(medicine_Description)
                    #print(medicine_Description)
                else:
                    medicine_Description_List.append("No description found.")
            else:
                print("Medicine description section not found.")
                
# print(medicine_Title)
# print(medicine_Price_List)
# print(medicine_Link)
# print(medicine_Description_List)


dictionary = {'Names': medicine_Title, 'Price': medicine_Price_List, 'Description': medicine_Description_List, 'Links': medicine_Link}

df = pd.DataFrame(dictionary)
df.to_csv('C:/Users/Azaan/Desktop/dawaai.pk_data.csv', index=False)
print("The data has been saved in the csv file.")
