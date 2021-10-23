import firebase_admin
import json
from firebase_admin import credentials
from firebase_admin import firestore
from firebase_admin import db
import pandas as pd
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.feature_selection import RFE


# Use the application default credentials
cred = credentials.Certificate("/Users/adelabdalla/Desktop/Blitz algorithm/serviceAccountKeyDEV.json")
firebase_admin.initialize_app(cred)
db=firestore.client()
collection = db.collection('blitz_vendors')
doc= collection.document("80WpPoNNeQdmzp9MB40aWkzG4we2")
res = doc.collection("sales_receipts").stream()


the_data = []
for i in res: 
    the_dict = i.to_dict()
    the_dict = the_dict["purchaseInfo"]
    del the_dict['timestamp'] 
    the_data.append(the_dict)
    


with open('realData.json', 'w') as f:
    json.dump(the_data, f)


# Table to relate names to the specific purchases. 
df = pd.read_json('realData.json')



## Table for the specific items.
df2 = df["purchaseInfo"]   




def cartitem_retrieve(column):
    empty = []
    for i in column:
        empty.append(i["cartItems"])

    return pd.Series(empty)




def product_name_retrieve(df):
    cleaned_column = cartitem_retrieve(df["purchaseInfo"])
    product_names =[]
    product_categories = []
    for row in cleaned_column:
        products = [dictionary["product_name"] for dictionary in row]
        categories = [dictionary["department"] for dictionary in row] 
        product_names.append(products)
        product_categories.append(categories)
        products= []
        categories =[]

    df["categories"] = product_categories
    df["products"]= product_names

    return df

def words_in_texts(words, texts):
    indicator_array = []
    for i in range(len(texts)):
        indicator_array.append(np.zeros(len(words)))
        
    for t in range(len(texts)):
        for ls in texts[t]:
            for count in range(len(ls)): 
                for w in range(len(words)):
                    if words[w] in ls[count]: 
                        indicator_array[t][w]+=1
    return indicator_array





def amount_purchased(words, texts):
    indicator_array = []
    for i in range(len(texts)):
        indicator_array.append(np.zeros(len(words)))
        
    for t in range(len(texts)):
        for ls in texts[t]:
            items_in_cart = ls["cartItems"]
            for i in items_in_cart:
                if i["department"] in words: 
                    the_index = words.index(i["department"])
                    if "purchaseCount" in i:
                        amount = i["purchaseCount"]
                        indicator_array[t][the_index]+=amount
                    else: 
                        amount_without = 1
                        indicator_array[t][the_index]+=amount_without
                else: 
                    pass
    return indicator_array



def cleaned_feature_table(df):
    newest_table = product_name_retrieve(df).drop(["confirmPaymentResult"],axis=1)
    new= newest_table.groupby("userId")["purchaseInfo"].apply(list)
    #new = new.apply(lambda x: x[0])
    array = amount_purchased(['Food', 'Dairy', 'Soda', 'Candies/Bars/Gum', 'Water/Juices',
       'Household Essentials', 'Health & Wellness', 'Pets',
       'Teas/coffees', 'Nuts/Seeds', 'Fresh Produce', 'Dry Tea/Coffee',
       'Chips', 'Drinks', 'Cheese', 'Ice Creams', 'Frozen Food',
       'Sports Drinks', 'Energy', 'Kombucha'],new)

    data_framed = pd.DataFrame(array, columns = ['Food', 'Dairy', 'Soda', 'Candies/Bars/Gum', 'Water/Juices',
       'Household Essentials', 'Health & Wellness', 'Pets',
       'Teas/coffees', 'Nuts/Seeds', 'Fresh Produce', 'Dry Tea/Coffee',
       'Chips', 'Drinks', 'Cheese', 'Ice Creams', 'Frozen Food',
       'Sports Drinks', 'Energy', 'Kombucha'])


    data_framed["classification"]= data_framed.idxmax(axis=1)
    data_framed["user"]=new.index

    return data_framed



 


def get_total_transaction(column):
    empty = []
    for i in column: 
        empty.append(i["subTotal"])

    return empty







#print(cartitem_retrieve(df["purchaseInfo"])[7])

        


def prices_in_texts(words, texts):
    indicator_array = []
    for i in range(len(texts)):
        indicator_array.append(np.zeros(len(words)))
        
    for t in range(len(texts)):
        for ls in texts[t]:
            items_in_cart = ls["cartItems"]
            for i in items_in_cart:
                if i["department"] in words: 
                    the_index = words.index(i["department"])
                    if "purchaseCount" in i:
                        amount = i["purchaseCount"]*i["sell_price"]
                        indicator_array[t][the_index]+=amount
                    else: 
                        amount_without = i["sell_price"]
                        indicator_array[t][the_index]+=amount_without
                else: 
                    pass
    return indicator_array

                    





def finalized_cleaner(df):
    new= df.groupby("userId")["purchaseInfo"].apply(list)

    array = prices_in_texts(['Food', 'Dairy', 'Soda', 'Candies/Bars/Gum', 'Water/Juices',
       'Household Essentials', 'Health & Wellness', 'Pets',
       'Teas/coffees', 'Nuts/Seeds', 'Fresh Produce', 'Dry Tea/Coffee',
       'Chips', 'Drinks', 'Cheese', 'Ice Creams', 'Frozen Food',
       'Sports Drinks', 'Energy', 'Kombucha'],new)


    data_framed = pd.DataFrame(array, columns = ['Food_total', 'Dairy_total', 'Soda_total', 'Candies/Bars/Gum_total', 'Water/Juices_total',
       'Household Essentials_total', 'Health & Wellness_total', 'Pets_total',
       'Teas/coffees_total', 'Nuts/Seeds_total', 'Fresh Produce_total', 'Dry Tea/Coffee_total',
       'Chips_total', 'Drinks_total', 'Cheese_total', 'Ice Creams_total', 'Frozen Food_total',
       'Sports Drinks_total', 'Energy_total', 'Kombucha_total'])



    other_one = cleaned_feature_table(df)

    finalized = other_one.merge(data_framed,left_index = True, right_index = True)


    return finalized


def machine_learning_model(df):
    model = LogisticRegression(multi_class='multinomial', solver='lbfgs',max_iter=100)
    X_train=finalized_cleaner(df).drop(["classification","user"],axis=1)
    y_train= finalized_cleaner(df)["classification"].to_frame()   
    model.fit(X_train,y_train)
    y_hat = model.predict(X_train)
    prediction_table = pd.DataFrame()
    prediction_table["user"] = finalized_cleaner(df)["user"]
    prediction_table["prediction"]=y_hat
    

    return prediction_table


def relevant_promotions(machine_learning_output):
    collection = db.collection('blitz_vendors')
    doc= collection.document("80WpPoNNeQdmzp9MB40aWkzG4we2")
    res = doc.collection("promotions").stream()
    promotional_data = []
    for i in res: 
        to_dictionary = i.to_dict()
        promotion_item = to_dictionary["item"]["upc"]
        promotion_category =  to_dictionary["item"]["department"]
        promotional_data.append([promotion_item,promotion_category])


    to_display = {}
    for i in range(len(machine_learning_output["prediction"])): 
        running_list = []
        for promos_list in promotional_data:
            if machine_learning_output["prediction"][i] in promos_list[1]:
                running_list.append(promos_list[0])
            
        to_display.update({machine_learning_output["user"][i]: running_list})
            

    return to_display






ss = machine_learning_model(df)

print(relevant_promotions(ss))










