import automation_functions as af
import pandas as pd
import numpy as np 
import csv


updated_inventory = pd.read_csv('updated_inventory_full.csv')
promotions_list = pd.io.json.read_json("promotionData.json")
current_inventory = pd.io.json.read_json("old_inventory_nonpromo.json")

## Initial clean and add of upce 
final_table = af.clean_headers(updated_inventory)
final_table["upce"] = [af.create_upce(i) for i in final_table["upc"]]

##add crv, and sugar tax and check for taxable, adds column for sugar_tax and images column. 
final_table = af.crv_column(final_table)
final_table = af.find_sugar(final_table).drop(["index"],axis=1)
final_table = af.get_taxable(final_table)


## Extract new products 
def extract_new_products():
    newest_products = final_table[(~final_table["upc"].isin(current_inventory["upc"]))&(~final_table["upc"].isin(promotions_list["upc"]))]
    newest_products["contains_promotion"]= False
    newest_products.to_csv('new_products.csv')
    return newest_products

## Extract changed promotions 
def extract_changed_promo():
    updated_promotions = final_table[final_table["upc"].isin(promotions_list["upc"])]
    merged_promotions = updated_promotions.merge(promotions_list,left_on="upc",right_on = "upc")
    changed_prices = merged_promotions[merged_promotions["Price"]!=merged_promotions["sell_price"]]
    final_changed_promotions = promotions_list[promotions_list["upc"].isin(changed_prices["upc"])]
    final_changed_promotions.to_csv('changed_promotions.csv')
    return final_changed_promotions


##Extract changed product pricing excluding promotions 
def extract_product_changes():
    exclude_promos = final_table[~final_table["upc"].isin(promotions_list["upc"])]
    merged_promotions = current_inventory.merge(exclude_promos,left_on="upc",right_on = "upc")
    changed_prices = merged_promotions[merged_promotions["Price"]!=merged_promotions["sell_price"]]
    final_changed_products = exclude_promos[exclude_promos["upc"].isin(changed_prices["upc"])]
    final_changed_products["contains_promotion"]= False
    final_changed_products["Images"] = merged_promotions["img"]
    final_changed_products.to_csv('changed_products.csv')
    return final_changed_products


extract_product_changes()




    
    
   