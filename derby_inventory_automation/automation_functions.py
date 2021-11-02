import pandas as pd
import numpy as np 
import csv



def clean_headers(df):
    df["Price"] = [float(i)/100 for i in df["cents"]]
    df = df.rename(columns = {"Department":"department","Name":"product_name","Fee Multiplier": "crv_by_05_cents","Price":"sell_price"})
    df = df[["upc","department","product_name","crv_by_05_cents","sell_price","size"]]
    return df


def create_upce(upca2):
    string = ''
    length=len(str(upca2))
    upca=str(upca2)
    list = [ "5", "6", "7", "8" ,"9"]
    upca= "0"+ upca
    if len(str(upca))!=12:
        return "0"
    if upca[10] in list and upca[5]!="0" and upca[6]=="0"and upca[7]=="0"and upca[8]=="0" and upca[9]=="0":
        string+=upca[0]
        string+=upca[1]
        string+=upca[2]
        string+=upca[3]
        string+=upca[4]
        string+=upca[5]
        string+=upca[10]
        string+=upca[11]

    if upca[5]=="0" and upca[7]=="0"and upca[8]=="0"and upca[9]=="0" and upca[4]!="0":
        string+=upca[0]
        string+=upca[1]
        string+=upca[2]
        string+=upca[3]
        string+=upca[4]
        string+=upca[10]
        string+="4"
        string+=upca[11]

    if upca[4]=="0" and upca[5]=="0"and upca[6]=="0"and upca[7]=="0" and upca[3]=="1" or upca[3]=="2" or upca[3]=="0":
        string+=upca[0]
        string+=upca[1]
        string+=upca[2]
        string+=upca[8]
        string+=upca[9]
        string+=upca[10]
        string+=upca[3]
        string+=upca[11]
    lister2=["3","4","5","6","7","8","9"]
    if upca[3] in lister2 and upca[4]=="0" and upca[5]=="0" and upca[6]=="0" and upca[7]=="0" and upca[8]=="0":
        string+=upca[0]
        string+=upca[1]
        string+=upca[2]
        string+=upca[3]
        string+=upca[9]
        string+=upca[10]
        string+="3"
        string+=upca[11]

    return string


## df = crv_column(df)
def crv_column(df):
    has_crv=[]
    departments = ["Soda","Water/Juices","Energy","Sports Drinks","Drinks","Teas/coffees"]
    for i in range(len(df["upc"])):
        if df["department"][i] in departments:
            has_crv.append(True)

        elif df["department"][i] not in departments: 
            has_crv.append(False)
    df["has_crv"]=has_crv
    return df


## returns the full table, including those without sugar 
def find_sugar (df): 
    ##table66 = table[(table["department"]=="Soda") | (table["department"]=="Water/Juices") | (table["department"]=="Sports Drinks")| (table["department"]=="Energy")].reset_index()
    table4 = df[(df["department"]=="Soda") | (df["department"]=="Water/Juices") | (df["department"]=="Sports Drinks") | (df["department"]=="Energy") | (df["department"]=="Drinks")| (df["department"]=="Kombucha")].reset_index()
    sugar_column=[]
    for i in range(len(table4["product_name"])):
        if "diet" in table4["product_name"][i] or "Diet" in table4["product_name"][i] or "Sugar" in  table4["product_name"][i] or "sugar" in table4["product_name"][i] or "Fresh" in table4["product_name"][i] or "Zero" in table4["product_name"][i] or "zero" in table4["product_name"][i] or "water" in table4["product_name"][i] or "Water" in table4["product_name"][i] or "Organic" in table4["product_name"][i] or "organic" in table4["product_name"][i] or "real" in table4["product_name"][i] or "Real" in table4["product_name"][i] or "Geyser" in table4["product_name"][i]:
            sugar_column.append(False)
        else: 
            sugar_column.append(True)
    table4["has_sugar_tax"] = sugar_column

    df_not_sugar= df[~df["upc"].isin(table4["upc"])]
    df_not_sugar["has_sugar_tax"]=False
    combined= df_not_sugar.append(table4)

    return combined


def add_images(df): 
    df["img"]= ""
    return df


##Gets whats taxable and whats not and returns a table with all the data, including a column to indicate taxabilty 
def get_taxable(df): 
    table44 = df[(df["department"]=="Energy")  |(df["department"]=="Pets")  |(df["department"]=="Soda")  |  (df["department"]=="Household Essentials")|(df["department"]=="Health & Wellness")]
    table44["has_sales_tax"]=True

    other_department = df[~df["upc"].isin(table44["upc"])]
    other_department["has_sales_tax"]=False

    finalized= table44.append(other_department)
    finalized["img"]=""
    finalized["sugar_tax"]=0

    return finalized



