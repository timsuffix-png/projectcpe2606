import requests as req
import random

URL = "http://localhost:3021/api/v1/"

# add user
user1 = req.post(URL + "user", json={
  "username": "Supapit123",
  "password": "SupapitPassword",
  "name": "ศุภาพิชญ์",
  "surname": "รักษาทรัพย์",
  "role": "m---------",
  "email": "Supapit@gmail.com",
  "gender": "female",
  "phone": "0935380243",
  "address": "จรัญสนิทวงศ์ 75 บางพลัด กรุงเทพมหานคร 10700"
}).json()

user2 = req.post(URL + "user", json={
  "username": "Pitsini123",
  "password": "PitsiniPassword",
  "name": "พิชญ์สินี",
  "surname": "เดชบุญ",
  "role": "-s--------",
  "email": "Pitsini@gmail.com",
  "gender": "female",
  "phone": "0853089923",
  "address": "67/6 ซ.ประชาราษฎร์ 4 ถ.ประชาราษฎร์ สาย 1 แขวงบางซื่อ เขตบางซื่อ กรุงเทพฯ"
}).json()

user3 = req.post(URL + "user", json={
  "username": "Preeya123",
  "password": "PreeyaPassword",
  "name": "ปรียา",
  "surname": "มั่นคง",
  "role": "--t-------",
  "email": "Preeya@gmail.com",
  "gender": "female",
  "phone": "0877749769",
  "address": "34/183, ถ.บางปะอิน, พระนครศรีอยุธยา, 13160"
}).json()

user4 = req.post(URL + "user", json={
  "username": "Wannapa123",
  "password": "WannapaPassword",
  "name": "วรรณภา",
  "surname": "ศรีเจริญพาณิชย์",
  "role": "---w------",
  "email": "Wannapa@gmail.com",
  "gender": "female",
  "phone": "0958192519",
  "address": "1511 ระหว่างซอยสุขุมวิท 67-69 ถนนสุขุมวิท แขวงพระโขนงเหนือ 10110"
}).json()

user5 = req.post(URL + "user", json={
  "username": "Pimpa123",
  "password": "PimpaPassword",
  "name": "พิมพา",
  "surname": "จตุพิทยากร",
  "role": "mstw------",
  "email": "Pimpa@gmail.com",
  "gender": "female",
  "phone": "0837967250",
  "address": "60, ถนนรัชดาภิเษกตัดใหม่, แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร, 10110"
}).json()

user6 = req.post(URL + "user", json={
  "username": "Treesa123",
  "password": "TreesaPassword",
  "name": "ตรีษา",
  "surname": "พิชิตชัย",
  "role": "-stw------",
  "email": "Treesa@gmail.com",
  "gender": "male",
  "phone": "0977923319",
  "address": "736, ถ.กรุงเกษม, เขตป้อมปราบ กรุงเทพฯ, 10100"
}).json()

user7 = req.post(URL + "user", json={
  "username": "Thanabodee123",
  "password": "ThanabodeePassword",
  "name": "ธนาบดี",
  "surname": "วรภัทรศิริสกุล",
  "role": "--tw------",
  "email": "Thanabodee@gmail.com",
  "gender": "male",
  "phone": "0873484439",
  "address": "69 ถนนนครปฐม (ถนนฮก) ติดริมคลองเปรมประชากร, แขวงดุสิต เขตดุสิต กรุงเทพฯ, 10300"
}).json()

user8 = req.post(URL + "user", json={
  "username": "Thawan123",
  "password": "ThawanPassword",
  "name": "ธาวัลย์",
  "surname": "อุดมวงศ์",
  "role": "-s-w------",
  "email": "Thawan@gmail.com",
  "gender": "female",
  "phone": "0654662949",
  "address": "77 หมู่ที่ 5, ต.วิชิต อ.เมือง จ.ภูเก็ต, 83000"
}).json()

user9 = req.post(URL + "user", json={
  "username": "Ariya123",
  "password": "AriyaPassword",
  "name": "อารียา",
  "surname": "วรวงศ์คุณากร",
  "role": "---w------",
  "email": "Ariya@gmail.com",
  "gender": "female",
  "phone": "0684393065",
  "address": "99 อิมแพค เมืองทองธานี ฮอลล์ 5ถนนป็อปปูล่า, บ้านใหม่ ปากเกร็ด นนทบุรี, 11120"
}).json()

user10 = req.post(URL + "user", json={
  "username": "Chonnika123",
  "password": "ChonnikaPassword",
  "name": "ชนนิกา",
  "surname": "จันทรประการ",
  "role": "---w------",
  "email": "Chonnika@gmail.com",
  "gender": "female",
  "phone": "0679075927",
  "address": "2547ถ.พหลโยธิน, ข.ลาดยาว ข.จตุจักร กรุงเทพมหานคร, 10900"
}).json()

user11 = req.post(URL + "user", json={
  "username": "managerName",
  "password": "1234",
  "name": "ยศภัทร",
  "surname": "ไกรภพ",
  "role": "m---------",
  "email": "manager@gmail.com",
  "gender": "male",
  "phone": "0674981295",
  "address": "526 ถ.เยาวราช แขวงสัมพันธวงศ์ เขตสัมพันธวงศ์ 10100"
}).json()

user12 = req.post(URL + "user", json={
  "username": "storageName",
  "password": "1234",
  "name": "จิรัณ",
  "surname": "เรืองสมัย",
  "role": "-s--------",
  "email": "storage@gmail.com",
  "gender": "male",
  "phone": "0901053783",
  "address": "226/12 13 16 ถ.พหลโยธินแขวงสามเสนใน เขตพญาไทกรุงเทพฯ10400"
}).json()

user13 = req.post(URL + "user", json={
  "username": "workerName",
  "password": "1234",
  "name": "ธณิศรา",
  "surname": "นันทภักดิ์",
  "role": "---w------",
  "email": "worker@gmail.com",
  "gender": "female",
  "phone": "0673954305",
  "address": "554-554/12 ถนนบรมราชชนนี แขวงบางบำหรุ เขตบางพลัด กรุงเทพมหานคร, 10700"
}).json()

user14 = req.post(URL + "user", json={
  "username": "tester",
  "password": "tester",
  "name": "ครองขวัญ",
  "surname": "กฤษฎ์พงษ์",
  "role": "--t-------",
  "email": "tester@gmail.com",
  "gender": "female",
  "phone": "0655680342",
  "address": "คณะวิทยาศาสตร์ มหาวิทยาลัยเกษตรศาสตร์ 10900"
}).json()

user15 = req.post(URL + "user", json={
  "username": "adminName",
  "password": "1234",
  "name": "ธนารีย์",
  "surname": "วงวรางค์",
  "role": "----a-----",
  "email": "admin@gmail.com",
  "gender": "male",
  "phone": "0983679345",
  "address": "1, ถ.พระราม 3, แขวงบางโพงพาง เขตยานนาวา กรุงเทพฯ, 10120"
}).json()

user16 = req.post(URL + "user", json={
  "username": "financeName",
  "password": "1234",
  "name": "ชัชชน",
  "surname": "สันติภิภักดิ์",
  "role": "-----f----",
  "email": "finance@gmail.com",
  "gender": "male",
  "phone": "0651898543",
  "address": "1032 ถนนสุขุมวิท พระโขนง คลองเตยา กรุงเทพมหานคร 10110"
}).json()

# approve user
req.patch(URL + "user/approve/" + user1["data"][0]["ID"])
req.patch(URL + "user/approve/" + user2["data"][0]["ID"])
req.patch(URL + "user/approve/" + user3["data"][0]["ID"])
req.patch(URL + "user/approve/" + user4["data"][0]["ID"])
req.patch(URL + "user/approve/" + user5["data"][0]["ID"])
req.patch(URL + "user/approve/" + user6["data"][0]["ID"])
req.patch(URL + "user/approve/" + user7["data"][0]["ID"])
req.patch(URL + "user/approve/" + user8["data"][0]["ID"])
req.patch(URL + "user/approve/" + user9["data"][0]["ID"])
req.patch(URL + "user/approve/" + user10["data"][0]["ID"])
req.patch(URL + "user/approve/" + user11["data"][0]["ID"])
req.patch(URL + "user/approve/" + user12["data"][0]["ID"])
req.patch(URL + "user/approve/" + user13["data"][0]["ID"])
req.patch(URL + "user/approve/" + user14["data"][0]["ID"])
req.patch(URL + "user/approve/" + user15["data"][0]["ID"])
req.patch(URL + "user/approve/" + user16["data"][0]["ID"])

# user login
req.post(URL + "user/auth", json={"username": "managerName", "password": "1234"})
req.post(URL + "user/logout", json={"userID": user11["data"][0]["ID"]})
req.post(URL + "user/auth", json={"username": "storageName", "password": "1234"})
req.post(URL + "user/auth", json={"username": "workerName", "password": "1234"})
req.post(URL + "user/logout", json={"userID": user12["data"][0]["ID"]})
req.post(URL + "user/logout", json={"userID": user13["data"][0]["ID"]})

# get item type
itemType = req.get(URL + "item/type?limit=100&page=1").json()
for type in itemType["data"]:
  if type["name"] == "สินค้า":
    itemType1 = type["ID"]
  elif type["name"] == "วัตถุดิบ":
    itemType2 = type["ID"]

# add material
material1 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ป้ายเตารีด CB95",
  "detail": "ป้ายเตารีด CB95 สำหรับการผลิตเตารีด CB95"
}).json()

material2 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ลิ้นเตารีดตัวเล็ก",
  "detail": "ลิ้นเตารีดตัวเล็ก"
}).json()

material3 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ด้ามน้ำเงิน สำเร็จ CB95",
  "detail": "ด้ามน้ำเงิน สำเร็จ CB95"
}).json()

material4 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ด้ามแดง สำเร็จ CB95",
  "detail": "ด้ามแดง สำเร็จ CB95"
}).json()

material5 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ด้ามเขียว สำเร็จ CB95",
  "detail": "ด้ามเขียว สำเร็จ CB95"
}).json()

material6 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ด้ามดำ สำเร็จ CB95+แอคคอร์ด",
  "detail": "ด้ามดำ สำเร็จ CB95+แอคคอร์ด"
}).json()

material7 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "แกนบิด CB95+แอคคอร์ด",
  "detail": "แกนบิด CB95+แอคคอร์ด"
}).json()

material8 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "สายถัก 2 ขั้ว",
  "detail": "สายถัก 2 ขั้ว"
}).json()

material9 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "หลอดไฟ CB95+เงาเล็กธรรมดา+เงาเล็กอินเตอร์+แอคคอร์ด",
  "detail": "หลอดไฟ CB95+เงาเล็กธรรมดา+เงาเล็กอินเตอร์+แอคคอร์ด"
}).json()

material10 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ฝาท้าย CB95+แอคคอร์ด",
  "detail": "ฝาท้าย CB95+แอคคอร์ด"
}).json()

material11 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ตาไฟสีส้ม",
  "detail": "ตาไฟสีส้ม"
}).json()

material12 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ฝากลาง CB95",
  "detail": "ฝากลาง CB95"
}).json()

material13 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ถุงใส 8x12 ",
  "detail": "ถุงใส 8x12 "
}).json()

material14 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "กล่อง CB95",
  "detail": "กล่อง CB95"
}).json()

material15 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "สติ๊กเกอร์วันที",
  "detail": "สติ๊กเกอร์วันที่"
}).json()

material16 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "สติ๊กเกอร์ติ๊กถูก",
  "detail": "สติ๊กเกอร์ติ๊กถูก"
}).json()

material17 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "คู่มือเตารีด",
  "detail": "คู่มือเตารีด"
}).json()

material18 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "กล่องใหญ่ตัว S",
  "detail": "กล่องใหญ่ตัว S"
}).json()

material19 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ฝาครอบ CB95+แอคคอร์ด",
  "detail": "ฝาครอบ CB95+แอคคอร์ด"
}).json()

material20 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ฝากลาง แอคคอร์ด",
  "detail": "ฝากลาง แอคคอร์ด"
}).json()

material21 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "คู่มือ แอคคอร์ด",
  "detail": "คู่มือ แอคคอร์ด"
}).json()

material22 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "สติ๊กเกอร์ แอคคอร์ด",
  "detail": "สติ๊กเกอร์ แอคคอร์ด"
}).json()

material23 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "กล่อง แอคคอร์ด",
  "detail": "กล่อง แอคคอร์ด"
}).json()

material24 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "สายถัก 3 ขั้ว แอคคอร์ด",
  "detail": "สายถัก 3 ขั้ว แอคคอร์ด"
}).json()

material25 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ป้ายเตารีด แอคคอร์ด",
  "detail": "ป้ายเตารีด แอคคอร์ด"
}).json()

material26 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ถุงหด แอคคอร์ด",
  "detail": "ถุงหด แอคคอร์ด"
}).json()

material27 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "กล่องใหญ่ แอคคอร์ด",
  "detail": "กล่องใหญ่ แอคคอร์ด"
}).json()

material28 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ด้าม สำเร็จ เงาเล็ก+JP87",
  "detail": "ด้าม สำเร็จ เงาเล็ก+JP87"
}).json()

material29 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ลูกบิด เงาเล็ก+JP87",
  "detail": "ลูกบิด เงาเล็ก+JP87"
}).json()

material30 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ฝาครอบ เงาเล็ก+JP87",
  "detail": "ฝาครอบ เงาเล็ก+JP87"
}).json()

material31 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "โครง เงาเล็ก+JP87",
  "detail": "โครง เงาเล็ก+JP87"
}).json()

material32 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "กล่อง JP87",
  "detail": "กล่อง JP87"
}).json()

material33 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ป้ายเตารีด JP87",
  "detail": "ป้ายเตารีด JP87"
}).json()

material34 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "แกนบิด เงาเล็ก+JP87",
  "detail": "แกนบิด เงาเล็ก+JP87"
}).json()

material35 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ฝาท้าย เงาเล็กธรรมดา+JP87",
  "detail": "ฝาท้าย เงาเล็กธรรมดา+JP87"
}).json()

material36 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ฝากลาง เงาเล็ก+JP87",
  "detail": "ฝากลาง เงาเล็ก+JP87"
}).json()

material37 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "โฟมหัว เงาเล็ก+เงาใหญ่+JP87",
  "detail": "โฟมหัว เงาเล็ก+เงาใหญ่+JP87"
}).json()

material38 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "โฟมท้าย เงาเล็ก+เงาใหญ่+JP87",
  "detail": "โฟมท้าย เงาเล็ก+เงาใหญ่+JP87"
}).json()

material39 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ป้ายเตารีด เงาเล็ก",
  "detail": "ป้ายเตารีด เงาเล็ก"
}).json()

material40 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "กล่อง เงาเล็ก",
  "detail": "กล่อง เงาเล็ก"
}).json()

material41 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ลวด เงาเล็ก",
  "detail": "ลวด เงาเล็ก"
}).json()

material42 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "กล่องใหญ่ เงาเล็ก",
  "detail": "กล่องใหญ่ เงาเล็ก"
}).json()

material43 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ด้ามสำเร็จ เงาใหญ่ธรรมดา+อินเตอร์ ",
  "detail": "ด้ามสำเร็จ เงาใหญ่ธรรมดา+อินเตอร์ "
}).json()

material44 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ป้ายเตารีด เงาใหญ่ธรรมดา",
  "detail": "ป้ายเตารีด เงาใหญ่ธรรมดา"
}).json()

material45 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ฝากลาง เงาใหญ่ธรรมดา+อินเตอร์",
  "detail": "ฝากลาง เงาใหญ่ธรรมดา+อินเตอร์"
}).json()

material46 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ฝาท้าย เงาใหญ่ธรรมดา+อินเตอร์",
  "detail": "ฝาท้าย เงาใหญ่ธรรมดา+อินเตอร์"
}).json()

material47 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "หลอดไฟ เงาใหญ่ธรรมดา+อินเตอร์",
  "detail": "หลอดไฟ เงาใหญ่ธรรมดา+อินเตอร์"
}).json()

material48 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "กล่องเงาใหญ่ธรรมดา",
  "detail": "กล่องเงาใหญ่ธรรมดา"
}).json()

material49 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "แกนบิดตัวใหญ่",
  "detail": "แกนบิดตัวใหญ่"
}).json()

material50 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "กล่องใหญ่ เงาใหญ่ธรรมดา+อินเตอร์",
  "detail": "กล่องใหญ่ เงาใหญ่ธรรมดา+อินเตอร์"
}).json()

material51 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "กล่อง เงาใหญ่อินเตอร์",
  "detail": "กล่อง เงาใหญ่อินเตอร์"
}).json()

material52 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ป้ายเตารีด เงาใหญ่อินเตอร์",
  "detail": "ป้ายเตารีด เงาใหญ่อินเตอร์"
}).json()

material53 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ลิ้น",
  "detail": "ลิ้น"
}).json()

material54 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ลิ้นตัวใหญ่เตารีด",
  "detail": "ลิ้นตัวใหญ่เตารีด"
}).json()

material55 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "บูธ",
  "detail": "บูธ"
}).json()

material56 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "แผ่นพื้นเตารีด เบอร์ 7",
  "detail": "แผ่นพื้นเตารีด เบอร์ 7"
}).json()

material57 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "แผ่นพื้นเตารีด เบอร์ 5",
  "detail": "แผ่นพื้นเตารีด เบอร์ 5"
}).json()

material58 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "แผ่นพื้นเตารีด เบอร์ 2",
  "detail": "แผ่นพื้นเตารีด เบอร์ 2"
}).json()

material59 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "แผ่นพื้นเตารีด เบอร์ 4",
  "detail": "แผ่นพื้นเตารีด เบอร์ 4"
}).json()

material60 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ถุงใส 9x14",
  "detail": "ถุงใส 9x14"
}).json()

material61 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เหล็กก้อนถ่วงน้ำหนักเล็ก",
  "detail": "เหล็กก้อนถ่วงน้ำหนักเล็ก"
}).json()

material62 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เหล็กก้อนถ่วงน้ำหนักใหญ่",
  "detail": "เหล็กก้อนถ่วงน้ำหนักใหญ่"
}).json()

material63 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "สายถัก 2 ขั้ว เงาใหญ่ธรรมดา+เงาใหญ่อินเตอร์",
  "detail": "สายถัก 2 ขั้ว เงาใหญ่ธรรมดา+เงาใหญ่อินเตอร์"
}).json()

material64 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ออโตเมติก TZ17",
  "detail": "ออโตเมติก TZ17"
}).json()

material65 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ขั้ว 2 รู",
  "detail": "ขั้ว 2 รู"
}).json()

material66 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "พื้นด้าม CB-95 ",
  "detail": "พื้นด้าม CB-95 "
}).json()

material67 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ฝาครอบด้าม CB95",
  "detail": "ฝาครอบด้าม CB95"
}).json()

material68 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ลูกบิด CB95+แอดคอร์ด",
  "detail": "ลูกบิด CB95+แอดคอร์ด"
}).json()

material69 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ด้ามเตารีด สีน้ำเงิน",
  "detail": "ด้ามเตารีด สีน้ำเงิน"
}).json()

material70 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ด้ามเตารีด สีแดง",
  "detail": "ด้ามเตารีด สีแดง"
}).json()

material71 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ด้ามเตารีด สีเขียว",
  "detail": "ด้ามเตารีด สีเขียว"
}).json()

material72 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ด้ามเตารีด สีดำ",
  "detail": "ด้ามเตารีด สีดำ"
}).json()

material73 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ด้าม เงาเล็ก+JP87",
  "detail": "ด้าม เงาเล็ก+JP87"
}).json()

material74 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ด้าม เงาใหญ่ธรรมดา+อินเตอร์",
  "detail": "ด้าม เงาใหญ่ธรรมดา+อินเตอร์"
}).json()

material75 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ลูกบิด เงาเล็ก+JP87",
  "detail": "ลูกบิด เงาเล็ก+JP87"
}).json()

material76 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ลูกศรตัวดำ",
  "detail": "ลูกศรตัวดำ"
}).json()

material77 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ลวดเบอร์ 16 ยาว 8.3 CB95+แอดคอร์ด",
  "detail": "ลวดเบอร์ 16 ยาว 8.3 CB95+แอดคอร์ด"
}).json()

material78 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "หัวเป็ด",
  "detail": "หัวเป็ด"
}).json()

material79 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "คันเร่ง",
  "detail": "คันเร่ง"
}).json()

material80 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เม็ดคันเร่ง",
  "detail": "เม็ดคันเร่ง"
}).json()

material81 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "พื้นตัว S",
  "detail": "พื้นตัว S"
}).json()

material82 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ปลอกสายเตารีด",
  "detail": "ปลอกสายเตารีด"
}).json()

material83 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "สปริงรองขันหัวเป็ด",
  "detail": "สปริงรองขันหัวเป็ด"
}).json()

material84 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ลวดเงาเล็ก",
  "detail": "ลวดเงาเล็ก"
}).json()

material85 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เทอร์โมสแตด ออโตเมติก",
  "detail": "เทอร์โมสแตด ออโตเมติก"
}).json()

material86 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เทอร์โมสแตด (ออโตเมติก) กระเบื้อง",
  "detail": "เทอร์โมสแตด (ออโตเมติก) กระเบื้อง"
}).json()

material87 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "แผ่นดิบเบอร์ 7 (แผ่นเตารีด)",
  "detail": "แผ่นดิบเบอร์ 7 (แผ่นเตารีด)"
}).json()

material88 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "แผ่นดิบเบอร์ 5 (แผ่นเตารีด)",
  "detail": "แผ่นดิบเบอร์ 5 (แผ่นเตารีด)"
}).json()

material89 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "แผ่นดิบเบอร์ 4 (แผ่นเตารีด)",
  "detail": "แผ่นดิบเบอร์ 4 (แผ่นเตารีด)"
}).json()

material90 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "แผ่นดิบเบอร์ 2 (แผ่นเตารีด)",
  "detail": "แผ่นดิบเบอร์ 2 (แผ่นเตารีด)"
}).json()

material91 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ตัว U (เตารีด)",
  "detail": "ตัว U (เตารีด)"
}).json()

material92 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "สกรูทองเหลือง",
  "detail": "สกรูทองเหลือง"
}).json()

material93 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ลวดสปริง",
  "detail": "ลวดสปริง"
}).json()

material94 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "สปริงกดลูกบิด CB95+แอดคอร์ด+JP87+เงาเล็ก",
  "detail": "สปริงกดลูกบิด CB95+แอดคอร์ด+JP87+เงาเล็ก"
}).json()

material95 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เม็ดเซรามิกลิ้น",
  "detail": "เม็ดเซรามิกลิ้น"
}).json()

material96 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "หัวกระเบื้อง",
  "detail": "หัวกระเบื้อง"
}).json()

material97 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "กระเบื้องตัวใหญ่",
  "detail": "กระเบื้องตัวใหญ่"
}).json()

material98 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ป้าย A B C",
  "detail": "ป้าย A B C"
}).json()

material99 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ป้าย 1,2,3",
  "detail": "ป้าย 1,2,3"
}).json()

material100 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ป้ายพระจันทร์",
  "detail": "ป้ายพระจันทร์"
}).json()

material101 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ขีดแดง",
  "detail": "ขีดแดง"
}).json()

material102 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ฝาครอบ เงาใหญ่ธรรมดา+อินเตอร์",
  "detail": "ฝาครอบ เงาใหญ่ธรรมดา+อินเตอร์"
}).json()

material103 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "สีดำ",
  "detail": "สีดำ"
}).json()

material104 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "สีขาว",
  "detail": "สีขาว"
}).json()

material105 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "สีแดงเข้ม",
  "detail": "สีแดงเข้ม"
}).json()

material106 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "สีน้ำเงิน",
  "detail": "สีน้ำเงิน"
}).json()

material107 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "น้ำยา Clear",
  "detail": "น้ำยา Clear"
}).json()

material108 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "น้ำยา Cleaner",
  "detail": "น้ำยา Cleaner"
}).json()

material109 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "น้ำยา THINNER",
  "detail": "น้ำยา THINNER"
}).json()

material110 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ทินเนอร์",
  "detail": "ทินเนอร์"
}).json()

material111 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "SOLDERING PASTE (น้ำยาบัดกรี)",
  "detail": "SOLDERING PASTE (น้ำยาบัดกรี)"
}).json()

material112 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "น้ำยาวานิชขุ่น",
  "detail": "น้ำยาวานิชขุ่น"
}).json()

material113 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "น้ำยาวานิชใส",
  "detail": "น้ำยาวานิชใส"
}).json()

material114 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "น้ำมันสน",
  "detail": "น้ำมันสน"
}).json()

material115 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "จาระบี",
  "detail": "จาระบี"
}).json()

material116 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "น้ำยาขัด",
  "detail": "น้ำยาขัด"
}).json()

material117 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "กาว",
  "detail": "กาว"
}).json()

material118 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "น้ำมันไฮโดรลิค 68",
  "detail": "น้ำมันไฮโดรลิค 68"
}).json()

material119 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "สเปย์ซิลิโคน",
  "detail": "สเปย์ซิลิโคน"
}).json()

material120 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ตะกั่ว",
  "detail": "ตะกั่ว"
}).json()

material121 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เซรามิกถ้วย",
  "detail": "เซรามิกถ้วย"
}).json()

material122 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เม็ดย้ำ 4x1.2x2 ",
  "detail": "เม็ดย้ำ 4x1.2x2 "
}).json()

material123 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ขายาว",
  "detail": "ขายาว"
}).json()

material124 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ขาสั้น",
  "detail": "ขาสั้น"
}).json()

material125 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "สปริงข้อต่อใหญ่",
  "detail": "สปริงข้อต่อใหญ่"
}).json()

material126 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "คางหมู ทำเหล็กก้อนใหญ่",
  "detail": "คางหมู ทำเหล็กก้อนใหญ่"
}).json()

material127 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ขา ทำเหล็กก้อนใหญ่",
  "detail": "ขา ทำเหล็กก้อนใหญ่"
}).json()

material128 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "คางหมู เหล็กก้อนเล็ก",
  "detail": "คางหมู เหล็กก้อนเล็ก"
}).json()

material129 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ขั้วอาร์ตแผ่น",
  "detail": "ขั้วอาร์ตแผ่น"
}).json()

material130 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ใบเมทอลเล็ก ข้อต่อลิ้นเตารีด",
  "detail": "ใบเมทอลเล็ก ข้อต่อลิ้นเตารีด"
}).json()

material131 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ขา L 4 รูซ้ายขวา",
  "detail": "ขา L 4 รูซ้ายขวา"
}).json()

material132 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "สายเตารีด 2 สาย",
  "detail": "สายเตารีด 2 สาย"
}).json()

material133 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "สายเตารีด 3 สาย",
  "detail": "สายเตารีด 3 สาย"
}).json()

material134 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ขาปลั๊ก 3 ขา",
  "detail": "ขาปลั๊ก 3 ขา"
}).json()

material135 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ขาปลั๊กเล็ก",
  "detail": "ขาปลั๊กเล็ก"
}).json()

material136 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ขาปลั๊ก 2 ขั้ว",
  "detail": "ขาปลั๊ก 2 ขั้ว"
}).json()

material137 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "สายรัด",
  "detail": "สายรัด"
}).json()

material138 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ปลอกเล็ก",
  "detail": "ปลอกเล็ก"
}).json()

material139 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ปลอกใหญ่",
  "detail": "ปลอกใหญ่"
}).json()

material140 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เม็ดลาย",
  "detail": "เม็ดลาย"
}).json()

material141 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "สายทองแดง",
  "detail": "สายทองแดง"
}).json()

material142 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "สาย PVC 2 ขั้ว + หัวแร้ง 2x0.5",
  "detail": "สาย PVC 2 ขั้ว + หัวแร้ง 2x0.5"
}).json()

material143 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "สาย PVC2 ขั้ว เครื่องปั่นอินเตอร์ 2x0.75 ",
  "detail": "สาย PVC2 ขั้ว เครื่องปั่นอินเตอร์ 2x0.75 "
}).json()

material144 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "หลอดไฟ",
  "detail": "หลอดไฟ"
}).json()

material145 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "สายหัวโตปลั๊กดำ (S)เตารีด ",
  "detail": "สายหัวโตปลั๊กดำ (S)เตารีด "
}).json()

material146 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "หลอดไฟ TZ17",
  "detail": "หลอดไฟ TZ17"
}).json()

material147 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ด้ามสีเขียว TZ17",
  "detail": "ด้ามสีเขียว TZ17"
}).json()

material148 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ด้ามสีแดง TZ17",
  "detail": "ด้ามสีแดง TZ17"
}).json()

material149 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ด้ามสีน้ำเงิน TZ17",
  "detail": "ด้ามสีน้ำเงิน TZ17"
}).json()

material150 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ด้ามสีดำ TZ17",
  "detail": "ด้ามสีดำ TZ17"
}).json()

material151 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ด้ามสำเร็จ สีเขียว TZ17",
  "detail": "ด้ามสำเร็จ สีเขียว TZ17"
}).json()

material152 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ด้ามสำเร็จ สีแดง TZ17",
  "detail": "ด้ามสำเร็จ สีแดง TZ17"
}).json()

material153 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ด้ามสำเร็จ สีน้ำเงิน TZ17",
  "detail": "ด้ามสำเร็จ สีน้ำเงิน TZ17"
}).json()

material154 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ด้ามสำเร็จ สีดำ TZ17",
  "detail": "ด้ามสำเร็จ สีดำ TZ17"
}).json()

material155 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ทองเหลือง 6 เหลี่ยม",
  "detail": "ทองเหลือง 6 เหลี่ยม"
}).json()

material156 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ป้ายเตารีด TZ17",
  "detail": "ป้ายเตารีด TZ17"
}).json()

material157 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ฝาท้าย TZ17",
  "detail": "ฝาท้าย TZ17"
}).json()

material158 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ลูกบิด TZ17",
  "detail": "ลูกบิด TZ17"
}).json()

material159 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ฝาครอบ TZ17",
  "detail": "ฝาครอบ TZ17"
}).json()

material160 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "กล่อง TZ17",
  "detail": "กล่อง TZ17"
}).json()

material161 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "แหวนสปริง 4 มิล รองน็อตลิ้น รองน็อตตั้งออโตเมติก",
  "detail": "แหวนสปริง 4 มิล รองน็อตลิ้น รองน็อตตั้งออโตเมติก"
}).json()

material162 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "น็อต 5.32x1.2 ตั้งออโตเมติก",
  "detail": "น็อต 5.32x1.2 ตั้งออโตเมติก"
}).json()

material163 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "น็อต 5/32x1/4 ขันลิ้น",
  "detail": "น็อต 5/32x1/4 ขันลิ้น"
}).json()

material164 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "น็อต 5.32x1.4 หัวเหล็กก้อน",
  "detail": "น็อต 5.32x1.4 หัวเหล็กก้อน"
}).json()

material165 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "น็อต 5.32x5.8 ท้ายเหล็กก้อนเล็ก",
  "detail": "น็อต 5.32x5.8 ท้ายเหล็กก้อนเล็ก"
}).json()

material166 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "น็อต 5.32x1 1.2 ขันด้าม CB95+เงาใหญ่",
  "detail": "น็อต 5.32x1 1.2 ขันด้าม CB95+เงาใหญ่"
}).json()

material167 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "น็อต 4x1/2 ขันฝาดำท้ายปิดสาย CB95+บาง",
  "detail": "น็อต 4x1/2 ขันฝาดำท้ายปิดสาย CB95+บาง"
}).json()

material168 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "น็อต 8x5/8 ขันดอกบัว+หัวเป็ด",
  "detail": "น็อต 8x5/8 ขันดอกบัว+หัวเป็ด"
}).json()

material169 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "น็อตตัวเมีย 4 มิล ขันฝา ขันด้าม",
  "detail": "น็อตตัวเมีย 4 มิล ขันฝา ขันด้าม"
}).json()

material170 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "น็อตวอลลุ่ม ใช้กับเสาอากาศ",
  "detail": "น็อตวอลลุ่ม ใช้กับเสาอากาศ"
}).json()

material171 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "น็อต 4x1/4 ตัวลัดเสาอากาศ",
  "detail": "น็อต 4x1/4 ตัวลัดเสาอากาศ"
}).json()

material172 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "น็อต 4x3/4 ขันท้ายปิดสาย 4.5",
  "detail": "น็อต 4x3/4 ขันท้ายปิดสาย 4.5"
}).json()

material173 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "น็อต 4x3/8 ใช้กับเสาอากาศ",
  "detail": "น็อต 4x3/8 ใช้กับเสาอากาศ"
}).json()

material174 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "น็อต 3x6 ขันขั้ว ขันสาย ขันหลอดไฟ",
  "detail": "น็อต 3x6 ขันขั้ว ขันสาย ขันหลอดไฟ"
}).json()

material175 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "น็อต 4x6 ขันลิ้น ขันขั้ว ขันหลอดไฟ รุ่นตัวบาง",
  "detail": "น็อต 4x6 ขันลิ้น ขันขั้ว ขันหลอดไฟ รุ่นตัวบาง"
}).json()

material176 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "น็อต 1/8x1/4 ขันปากหัวแร้ง",
  "detail": "น็อต 1/8x1/4 ขันปากหัวแร้ง"
}).json()

material177 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "แหวนตัวอี ETW-3 เคาะหัวกระเบื้อง",
  "detail": "แหวนตัวอี ETW-3 เคาะหัวกระเบื้อง"
}).json()

material178 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "น็อตM 3x0.5 ตัวเมียเล็ก",
  "detail": "น็อตM 3x0.5 ตัวเมียเล็ก"
}).json()

material179 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "น็อต2x8 mm ใส่ทองเหลืองโครงบาง",
  "detail": "น็อต2x8 mm ใส่ทองเหลืองโครงบาง"
}).json()

material180 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "น็อตM 3 แหวนอีแปะเล็ก",
  "detail": "น็อตM 3 แหวนอีแปะเล็ก"
}).json()

material181 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "น็อตM 4 (แหวนอีแปะ) ใหม่",
  "detail": "น็อตM 4 (แหวนอีแปะ) ใหม่"
}).json()

material182 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ตาไก่เล็ก 6'มิลN ตอกสาย",
  "detail": "ตาไก่เล็ก 6'มิลN ตอกสาย"
}).json()

material183 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "แหวนตัวอี ETW-4 ใช้กับตัวบาง+เสาอากาศ",
  "detail": "แหวนตัวอี ETW-4 ใช้กับตัวบาง+เสาอากาศ"
}).json()

material184 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ตาไก่ใหญ่ 26' N",
  "detail": "ตาไก่ใหญ่ 26' N"
}).json()

material185 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "น็อต5/32 x 1/4 (ชุบรุ้ง)",
  "detail": "น็อต5/32 x 1/4 (ชุบรุ้ง)"
}).json()

material186 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เกลียวปล่อย 8 x 1/2 P+ST+Ni (ชุบแข็ง)",
  "detail": "เกลียวปล่อย 8 x 1/2 P+ST+Ni (ชุบแข็ง)"
}).json()

material187 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": 'น็อตเกลียวเหล็ก 4 x 1" ขันท้ายปิดสาย',
  "detail": 'น็อตเกลียวเหล็ก 4 x 1" ขันท้ายปิดสาย'
}).json()

material188 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "น็อตเกลียวเหล็ก 6x3/8 ขันตัวดำ",
  "detail": "น็อตเกลียวเหล็ก 6x3/8 ขันตัวดำ"
}).json()

material189 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "น็อตเกลียวเหล็ก 6x1/2 ตั้งด้าม",
  "detail": "น็อตเกลียวเหล็ก 6x1/2 ตั้งด้าม"
}).json()

material190 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "น็อต 5.32x7/8 ท้ายเหล็กก้อน ใหม่",
  "detail": "น็อต 5.32x7/8 ท้ายเหล็กก้อน ใหม่"
}).json()

material191 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "น็อต JP+M4x12 ใส่ออโตเมติก",
  "detail": "น็อต JP+M4x12 ใส่ออโตเมติก"
}).json()

material192 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "น็อต JP+M4x16 ใส่โครง",
  "detail": "น็อต JP+M4x16 ใส่โครง"
}).json()

material193 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "น็อต JP+M4x45 ขันมอเตอร์",
  "detail": "น็อต JP+M4x45 ขันมอเตอร์"
}).json()

material194 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "แหวนนม",
  "detail": "แหวนนม"
}).json()

material195 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "สกรู JT+_M3x6",
  "detail": "สกรู JT+_M3x6"
}).json()

material196 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ทองเหลืองหลอดไฟหัวแร้ง",
  "detail": "ทองเหลืองหลอดไฟหัวแร้ง"
}).json()

material197 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "น็อต PT+3.5x7 ขาว ขันพื้น CB95",
  "detail": "น็อต PT+3.5x7 ขาว ขันพื้น CB95"
}).json()

material198 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ปากหัวเเร้ง",
  "detail": "ปากหัวเเร้ง"
}).json()

material199 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ตาไก่คอยด์มอเตอร์",
  "detail": "ตาไก่คอยด์มอเตอร์"
}).json()

material200 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "แหวนตัวเมีย 5 มิล (ประกอบหัวแร้ง)",
  "detail": "แหวนตัวเมีย 5 มิล (ประกอบหัวแร้ง)"
}).json()

material201 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "3/16 x 3/4 (ประกอบหัวแร้ง)",
  "detail": "3/16 x 3/4 (ประกอบหัวแร้ง)"
}).json()

material202 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "น็อต 3/16x5/8 ขันรูล่าง ",
  "detail": "น็อต 3/16x5/8 ขันรูล่าง "
}).json()

material203 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ไฟเบอร์แดง",
  "detail": "ไฟเบอร์แดง"
}).json()

material204 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เม็ดซิกซ์ไฟเบอร์",
  "detail": "เม็ดซิกซ์ไฟเบอร์"
}).json()

material205 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เม็ด ABS สีงา",
  "detail": "เม็ด ABS สีงา"
}).json()

material206 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เม็ด ABS ขาวนม",
  "detail": "เม็ด ABS ขาวนม"
}).json()

material207 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เม็ดโพลีน",
  "detail": "เม็ดโพลีน"
}).json()

material208 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เม็ด PP",
  "detail": "เม็ด PP"
}).json()

material209 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เม็ด PVC เบอร์ 60",
  "detail": "เม็ด PVC เบอร์ 60"
}).json()

material210 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เม็ด PVC เบอร์ 80",
  "detail": "เม็ด PVC เบอร์ 80"
}).json()

material211 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เม็ด GPPS",
  "detail": "เม็ด GPPS"
}).json()

material212 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เม็ดแบลกกาไลท์",
  "detail": "เม็ดแบลกกาไลท์"
}).json()

material213 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "หมุด เหล็กก้อนเล็ก",
  "detail": "หมุด เหล็กก้อนเล็ก"
}).json()

material214 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "หมุด เหล็กก้อนใหญ่",
  "detail": "หมุด เหล็กก้อนใหญ่"
}).json()

material215 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "พื้นตัวบาง TZ17",
  "detail": "พื้นตัวบาง TZ17"
}).json()

material216 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ขา L 4 รูกลาง",
  "detail": "ขา L 4 รูกลาง"
}).json()

material217 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "สปริงแหวนเงิน",
  "detail": "สปริงแหวนเงิน"
}).json()

material218 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "สวิทซ์",
  "detail": "สวิทซ์"
}).json()

material219 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "สติ๊กเกอร์เครื่องปั่นอินเตอร์",
  "detail": "สติ๊กเกอร์เครื่องปั่นอินเตอร์"
}).json()

material220 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "สติ๊กเกอร์มอเตอร์",
  "detail": "สติ๊กเกอร์มอเตอร์"
}).json()

material221 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "โฟมซ้าย",
  "detail": "โฟมซ้าย"
}).json()

material222 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "โฟมขวา",
  "detail": "โฟมขวา"
}).json()

material223 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "กล่องใหญ่เครื่องปั่นอินเตอร์",
  "detail": "กล่องใหญ่เครื่องปั่นอินเตอร์"
}).json()

material224 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "กล่องใหญ่เครื่องปั่นธรรมดา",
  "detail": "กล่องใหญ่เครื่องปั่นธรรมดา"
}).json()

material225 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "คอยด์",
  "detail": "คอยด์"
}).json()

material226 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "สายสั้น+ทองเหลือง ",
  "detail": "สายสั้น+ทองเหลือง "
}).json()

material227 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "สายยาว ",
  "detail": "สายยาว "
}).json()

material228 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ใบมีดโถ NA",
  "detail": "ใบมีดโถ NA"
}).json()

material229 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ใบมีดแก้ว NA",
  "detail": "ใบมีดแก้ว NA"
}).json()

material230 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "แก้ว",
  "detail": "แก้ว"
}).json()

material231 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "จุกดำ",
  "detail": "จุกดำ"
}).json()

material232 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เฟือง",
  "detail": "เฟือง"
}).json()

material233 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "บูธทองเหลือง",
  "detail": "บูธทองเหลือง"
}).json()

material234 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ซีลยางดำ",
  "detail": "ซีลยางดำ"
}).json()

material235 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ยางวงรองโถ",
  "detail": "ยางวงรองโถ"
}).json()

material236 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เฟืองถ้วยเกลียว SH",
  "detail": "เฟืองถ้วยเกลียว SH"
}).json()

material237 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ฝาครอบมอเตอร์ตัวบน",
  "detail": "ฝาครอบมอเตอร์ตัวบน"
}).json()

material238 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "กระโหลกเหลือง",
  "detail": "กระโหลกเหลือง"
}).json()

material239 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "กระโหลกเขียว",
  "detail": "กระโหลกเขียว"
}).json()

material240 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ดอกบัว",
  "detail": "ดอกบัว"
}).json()

material241 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "พื้นเหลือง",
  "detail": "พื้นเหลือง"
}).json()

material242 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "พื้นเขียว",
  "detail": "พื้นเขียว"
}).json()

material243 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ฝาปิดโถเหลือง",
  "detail": "ฝาปิดโถเหลือง"
}).json()

material244 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ฝาปิดโถเขียว",
  "detail": "ฝาปิดโถเขียว"
}).json()

material245 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ถ้วยเกลียวเหลือง",
  "detail": "ถ้วยเกลียวเหลือง"
}).json()

material246 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ถ้วยเกลียวเขียว",
  "detail": "ถ้วยเกลียวเขียว"
}).json()

material247 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ไม้พาย",
  "detail": "ไม้พาย"
}).json()

material248 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "โถใส",
  "detail": "โถใส"
}).json()

material249 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เหล็กพันคอยด์",
  "detail": "เหล็กพันคอยด์"
}).json()

material250 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ไมร่าคอยด์",
  "detail": "ไมร่าคอยด์"
}).json()

material251 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ลวดทองแดงเบอร์ 31",
  "detail": "ลวดทองแดงเบอร์ 31"
}).json()

material252 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "พลาสติกพันคอยด์",
  "detail": "พลาสติกพันคอยด์"
}).json()

material253 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "พลาสติกรางถ่าน",
  "detail": "พลาสติกรางถ่าน"
}).json()

material254 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "แกนทุ่น",
  "detail": "แกนทุ่น"
}).json()

material255 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เหล็กทุ่น",
  "detail": "เหล็กทุ่น"
}).json()

material256 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "คอมมิว",
  "detail": "คอมมิว"
}).json()

material257 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "หลอดทุ่น",
  "detail": "หลอดทุ่น"
}).json()

material258 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ไมร่า",
  "detail": "ไมร่า"
}).json()

material259 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ลวดทองแดง เบอร์ 35",
  "detail": "ลวดทองแดง เบอร์ 35"
}).json()

material260 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ทุ่น",
  "detail": "ทุ่น"
}).json()

material261 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "Epoxy Resin A",
  "detail": "Epoxy Resin A"
}).json()

material262 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "Epoxy Resin B",
  "detail": "Epoxy Resin B"
}).json()

material263 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "มอเตอร์เครื่องปั่น",
  "detail": "มอเตอร์เครื่องปั่น"
}).json()

material264 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "หูมอเตอร์",
  "detail": "หูมอเตอร์"
}).json()

material265 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ถ่าน",
  "detail": "ถ่าน"
}).json()

material266 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "สปริง",
  "detail": "สปริง"
}).json()

material267 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ฝาครอบมอเตอร์ตัวล่าง",
  "detail": "ฝาครอบมอเตอร์ตัวล่าง"
}).json()

material268 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "บูธชาป",
  "detail": "บูธชาป"
}).json()

material269 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ซีลยางขาว",
  "detail": "ซีลยางขาว"
}).json()

material270 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ชาปชมพู",
  "detail": "ชาปชมพู"
}).json()

material271 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ชาปเทา",
  "detail": "ชาปเทา"
}).json()

material272 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ชาปเขียว",
  "detail": "ชาปเขียว"
}).json()

material273 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ฝาชมพู",
  "detail": "ฝาชมพู"
}).json()

material274 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ฝาเทา",
  "detail": "ฝาเทา"
}).json()

material275 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ใบมีดชาป",
  "detail": "ใบมีดชาป"
}).json()

material276 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "แหวนสำลีเล็ก",
  "detail": "แหวนสำลีเล็ก"
}).json()

material277 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "กล่องสวิทซ์",
  "detail": "กล่องสวิทซ์"
}).json()

material278 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ขาทองเหลืองใหญ่",
  "detail": "ขาทองเหลืองใหญ่"
}).json()

material279 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ขาทองเหลืองเล็ก",
  "detail": "ขาทองเหลืองเล็ก"
}).json()

material280 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ทองเหลืองกลาง",
  "detail": "ทองเหลืองกลาง"
}).json()

material281 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "สปริงทองแดง",
  "detail": "สปริงทองแดง"
}).json()

material282 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "สะพาน",
  "detail": "สะพาน"
}).json()

material283 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เม็ดย้ำขาทองเหลือง",
  "detail": "เม็ดย้ำขาทองเหลือง"
}).json()

material284 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "สปริงสวิตซ์",
  "detail": "สปริงสวิตซ์"
}).json()

material285 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เม็ดย้ำใบเมททอล",
  "detail": "เม็ดย้ำใบเมททอล"
}).json()

material286 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เม็ดข้าวสาร",
  "detail": "เม็ดข้าวสาร"
}).json()

material287 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "รถถัง",
  "detail": "รถถัง"
}).json()

material288 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "จุกสวิทซ์",
  "detail": "จุกสวิทซ์"
}).json()

material289 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เม็ดย้ำ",
  "detail": "เม็ดย้ำ"
}).json()

material290 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ใบเมทอลใหญ่",
  "detail": "ใบเมทอลใหญ่"
}).json()

material291 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เหล็กรองหูมอเตอร์",
  "detail": "เหล็กรองหูมอเตอร์"
}).json()

material292 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "แหวนแดง",
  "detail": "แหวนแดง"
}).json()

material293 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "แหวนน้ำตาล",
  "detail": "แหวนน้ำตาล"
}).json()

material294 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "กล่องถ่าน",
  "detail": "กล่องถ่าน"
}).json()

material295 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เหล็กดาว",
  "detail": "เหล็กดาว"
}).json()

material296 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "สปริงรองใบมีด",
  "detail": "สปริงรองใบมีด"
}).json()

material297 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "แหวนแบลกกาไลท์",
  "detail": "แหวนแบลกกาไลท์"
}).json()

material298 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ซีลใยสังเคราะห์",
  "detail": "ซีลใยสังเคราะห์"
}).json()

material299 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "กล่องเครื่องปั่นธรรมดา",
  "detail": "กล่องเครื่องปั่นธรรมดา"
}).json()

material300 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "กล่องเครื่องปั่นอินเตอร์",
  "detail": "กล่องเครื่องปั่นอินเตอร์"
}).json()

material301 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "มอเตอร์หัวแร้ง",
  "detail": "มอเตอร์หัวแร้ง"
}).json()

material302 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ฝาครอบซ้าย",
  "detail": "ฝาครอบซ้าย"
}).json()

material303 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ฝาครอบขวา",
  "detail": "ฝาครอบขวา"
}).json()

material304 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "สวิตซ์หัวแร้ง",
  "detail": "สวิตซ์หัวแร้ง"
}).json()

material305 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ทองเหลือง",
  "detail": "ทองเหลือง"
}).json()

material306 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "หลอดไฟ",
  "detail": "หลอดไฟ"
}).json()

material307 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ไกสวิตซ์",
  "detail": "ไกสวิตซ์"
}).json()

material308 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ปากหัวแร้ง",
  "detail": "ปากหัวแร้ง"
}).json()

material309 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "น็อต 3/16x6/8 ขันรูบน 2 ข้าง",
  "detail": "น็อต 3/16x6/8 ขันรูบน 2 ข้าง"
}).json()

material310 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "น็อตตัวเมีย 5 มิล",
  "detail": "น็อตตัวเมีย 5 มิล"
}).json()

material311 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "สติ๊กเกอร์หัวแร้ง",
  "detail": "สติ๊กเกอร์หัวแร้ง"
}).json()

material312 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "กล่องหัวแร้ง",
  "detail": "กล่องหัวแร้ง"
}).json()

material313 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "กล่องใหญ่หัวแร้ง",
  "detail": "กล่องใหญ่หัวแร้ง"
}).json()

material314 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "หลอดเครื่องปั่น",
  "detail": "หลอดเครื่องปั่น"
}).json()

material315 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ขาซ้าย",
  "detail": "ขาซ้าย"
}).json()

material316 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ขาขวา",
  "detail": "ขาขวา"
}).json()

material317 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ขาตรง",
  "detail": "ขาตรง"
}).json()

material318 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ขาออโตเมติก",
  "detail": "ขาออโตเมติก"
}).json()

material319 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "น็อต 3.5 x 7.5 ขันตัวบนด้าม S",
  "detail": "น็อต 3.5 x 7.5 ขันตัวบนด้าม S"
}).json()

material320 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เหรียญเสาอากาศ",
  "detail": "เหรียญเสาอากาศ"
}).json()

material321 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "กระโหลกเสาอากาศ",
  "detail": "กระโหลกเสาอากาศ"
}).json()

material322 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เฟืองถ้วยเกลียว NA",
  "detail": "เฟืองถ้วยเกลียว NA"
}).json()

material323 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ปีกเสาอากาศ",
  "detail": "ปีกเสาอากาศ"
}).json()

material324 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "กล่องสวิทซ์",
  "detail": "กล่องสวิทซ์"
}).json()

material325 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "จุกหมุน",
  "detail": "จุกหมุน"
}).json()

material326 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เสาอากาศ+ตุ๊กตา",
  "detail": "เสาอากาศ+ตุ๊กตา"
}).json()

material327 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "สายไฟนอกเสาอากาศ",
  "detail": "สายไฟนอกเสาอากาศ"
}).json()

material328 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "สายไฟในเสาอากาศ",
  "detail": "สายไฟในเสาอากาศ"
}).json()

material329 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ตัวตุ๊กตาด้านหน้า",
  "detail": "ตัวตุ๊กตาด้านหน้า"
}).json()

material330 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ตัวตุ๊กตาด้านหลัง",
  "detail": "ตัวตุ๊กตาด้านหลัง"
}).json()

material331 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ฐานเสาอากาศ",
  "detail": "ฐานเสาอากาศ"
}).json()

material332 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "พื้นเสาอากาศ",
  "detail": "พื้นเสาอากาศ"
}).json()

material333 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "สติ๊กเกอร์เสาอากาศ",
  "detail": "สติ๊กเกอร์เสาอากาศ"
}).json()

material334 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ปลอกสายเตารีดบาง",
  "detail": "ปลอกสายเตารีดบาง"
}).json()

material335 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "หลอดไฟตัวบาง",
  "detail": "หลอดไฟตัวบาง"
}).json()

material336 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ขาทองแดงสวิทซ์เสาอากาศ",
  "detail": "ขาทองแดงสวิทซ์เสาอากาศ"
}).json()

material337 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "กล่องสวิทซ์ด้านหน้า",
  "detail": "กล่องสวิทซ์ด้านหน้า"
}).json()

material338 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "กล่องสวิทซ์ด้านหลัง",
  "detail": "กล่องสวิทซ์ด้านหลัง"
}).json()

material339 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ลูกปืน",
  "detail": "ลูกปืน"
}).json()

material340 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ปิ่น",
  "detail": "ปิ่น"
}).json()

material341 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "แกนสวิทซ์เสาอากาศ",
  "detail": "แกนสวิทซ์เสาอากาศ"
}).json()

material342 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "สติ๊กเกอร์เครื่องปั่นธรรมดา",
  "detail": "สติ๊กเกอร์เครื่องปั่นธรรมดา"
}).json()

material343 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "กระดาษห่อแก้ว",
  "detail": "กระดาษห่อแก้ว"
}).json()

material344 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "กล่องใหญ่เสาอากาศ",
  "detail": "กล่องใหญ่เสาอากาศ"
}).json()

material345 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "กล่องเสาอากาศ",
  "detail": "กล่องเสาอากาศ"
}).json()

material346 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ตัวลัด",
  "detail": "ตัวลัด"
}).json()

material347 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ขาปลั๊ก 2 ขา",
  "detail": "ขาปลั๊ก 2 ขา"
}).json()

material348 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "สปริงเสาอากาศ",
  "detail": "สปริงเสาอากาศ"
}).json()

material349 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "คู่มือเครื่องปั่น",
  "detail": "คู่มือเครื่องปั่น"
}).json()

material350 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ขา เหล็กก้อนเล็ก",
  "detail": "ขา เหล็กก้อนเล็ก"
}).json()

material351 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "น็อต PT+3x5.7 ขันพื้น",
  "detail": "น็อต PT+3x5.7 ขันพื้น"
}).json()

material352 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ฝาเขียว",
  "detail": "ฝาเขียว"
}).json()

material353 = req.post(URL + "items", json={
  "itemType": itemType2,
  "isFavourite": False,
  "amount": 1000,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ตาไฟ TZ17",
  "detail": "ตาไฟ TZ17"
}).json()

# add item
item1 = req.post(URL + "items", json={
  "itemType": itemType1,
  "isFavourite": True,
  "amount": 50,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เตารีด CB 95 ดำหัวเล็ก",
  "detail": "เตารีด CB 95 ดำหัวเล็ก"
}).json()

item2 = req.post(URL + "items", json={
  "itemType": itemType1,
  "isFavourite": True,
  "amount": 50,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เตารีด CB 95 ดำหัวโต",
  "detail": "เตารีด CB 95 ดำหัวโต"
}).json()

item3 = req.post(URL + "items", json={
  "itemType": itemType1,
  "isFavourite": True,
  "amount": 50,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เตารีด CB 95 น้ำเงิน",
  "detail": "เตารีด CB 95 น้ำเงิน"
}).json()

item4 = req.post(URL + "items", json={
  "itemType": itemType1,
  "isFavourite": True,
  "amount": 50,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เตารีด CB 95 เขียว",
  "detail": "เตารีด CB 95 เขียว"
}).json()

item5 = req.post(URL + "items", json={
  "itemType": itemType1,
  "isFavourite": True,
  "amount": 50,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เตารีด CB 95 แดง",
  "detail": "เตารีด CB 95 แดง"
}).json()

item6 = req.post(URL + "items", json={
  "itemType": itemType1,
  "isFavourite": True,
  "amount": 50,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เตารีด CB 95 สีหัวโต",
  "detail": "เตารีด CB 95 สีหัวโต"
}).json()

item7 = req.post(URL + "items", json={
  "itemType": itemType1,
  "isFavourite": True,
  "amount": 50,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เตารีด CB 95 สีหัวเล็ก",
  "detail": "เตารีด CB 95 สีหัวเล็ก"
}).json()

item8 = req.post(URL + "items", json={
  "itemType": itemType1,
  "isFavourite": True,
  "amount": 50,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เตารีด แอคคอร์ด",
  "detail": "เตารีด แอคคอร์ด"
}).json()

item9 = req.post(URL + "items", json={
  "itemType": itemType1,
  "isFavourite": True,
  "amount": 50,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เตารีด 3.5 เงาเล็ก ธรรมดา",
  "detail": "เตารีด 3.5 เงาเล็ก ธรรมดา"
}).json()

item10 = req.post(URL + "items", json={
  "itemType": itemType1,
  "isFavourite": True,
  "amount": 50,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เตารีด 4.5 เงาใหญ่ อินเตอร์",
  "detail": "เตารีด 4.5 เงาใหญ่ อินเตอร์"
}).json()

item11 = req.post(URL + "items", json={
  "itemType": itemType1,
  "isFavourite": True,
  "amount": 50,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เตารีด 4.5 เงาใหญ่ ธรรมดา",
  "detail": "เตารีด 4.5 เงาใหญ่ ธรรมดา"
}).json()

item12 = req.post(URL + "items", json={
  "itemType": itemType1,
  "isFavourite": True,
  "amount": 50,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เตารีด JP 87",
  "detail": "เตารีด JP 87"
}).json()

item13 = req.post(URL + "items", json={
  "itemType": itemType1,
  "isFavourite": True,
  "amount": 50,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เตารีด TZ17 สี",
  "detail": "เตารีด TZ17 สี"
}).json()

item14 = req.post(URL + "items", json={
  "itemType": itemType1,
  "isFavourite": True,
  "amount": 50,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เตารีด TZ17 น้ำเงิน",
  "detail": "เตารีด TZ17 น้ำเงิน"
}).json()

item15 = req.post(URL + "items", json={
  "itemType": itemType1,
  "isFavourite": True,
  "amount": 50,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เตารีด TZ17 แดง",
  "detail": "เตารีด TZ17 แดง"
}).json()

item16 = req.post(URL + "items", json={
  "itemType": itemType1,
  "isFavourite": True,
  "amount": 50,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เตารีด TZ17 เขียว",
  "detail": "เตารีด TZ17 เขียว"
}).json()

item17 = req.post(URL + "items", json={
  "itemType": itemType1,
  "isFavourite": True,
  "amount": 50,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เตารีด TZ17 ดำ",
  "detail": "เตารีด TZ17 ดำ"
}).json()

item18 = req.post(URL + "items", json={
  "itemType": itemType1,
  "isFavourite": True,
  "amount": 50,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "มิสทีน",
  "detail": "มิสทีน"
}).json()

item19 = req.post(URL + "items", json={
  "itemType": itemType1,
  "isFavourite": True,
  "amount": 50,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เครื่องปั่นเขียว อินเตอร์",
  "detail": "เครื่องปั่นเขียว อินเตอร์"
}).json()

item20 = req.post(URL + "items", json={
  "itemType": itemType1,
  "isFavourite": True,
  "amount": 50,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เครื่องปั่นเหลือง อินเตอร์",
  "detail": "เครื่องปั่นเหลือง อินเตอร์"
}).json()

item21 = req.post(URL + "items", json={
  "itemType": itemType1,
  "isFavourite": True,
  "amount": 50,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เครื่องปั่นเขียว ธรรมดา",
  "detail": "เครื่องปั่นเขียว ธรรมดา"
}).json()

item22 = req.post(URL + "items", json={
  "itemType": itemType1,
  "isFavourite": True,
  "amount": 50,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เครื่องปั่นเหลือง ธรรมดา",
  "detail": "เครื่องปั่นเหลือง ธรรมดา"
}).json()

item23 = req.post(URL + "items", json={
  "itemType": itemType1,
  "isFavourite": True,
  "amount": 50,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "ปืนหัวแร้ง",
  "detail": "ปืนหัวแร้ง"
}).json()

item24 = req.post(URL + "items", json={
  "itemType": itemType1,
  "isFavourite": True,
  "amount": 50,
  "costPrice": 0,
  "salePrice": 0,
  "insurancePeriod": 0,
  "name": "เสาอากาศ",
  "detail": "เสาอากาศ"
}).json()

# order number
order1 = req.post(URL + "item/wantBuy", json={
  "itemID": material1["data"][0]["ID"],
  "buyBy": user1["data"][0]["ID"],
  "costPerItem": 3,
  "amount": 100
}).json()

order2 = req.post(URL + "item/wantBuy", json={
  "itemID": material25["data"][0]["ID"],
  "buyBy": user1["data"][0]["ID"],
  "costPerItem": 5,
  "amount": 50
}).json()

order3 = req.post(URL + "item/wantBuy", json={
  "itemID": material92["data"][0]["ID"],
  "buyBy": user1["data"][0]["ID"],
  "costPerItem": 10,
  "amount": 100
}).json()

order4 = req.post(URL + "item/wantBuy", json={
  "itemID": material120["data"][0]["ID"],
  "buyBy": user1["data"][0]["ID"],
  "costPerItem": 150,
  "amount": 5
}).json()

order5 = req.post(URL + "item/wantBuy", json={
  "itemID": material285["data"][0]["ID"],
  "buyBy": user5["data"][0]["ID"],
  "costPerItem": 350,
  "amount": 100
}).json()

order6 = req.post(URL + "item/wantBuy", json={
  "itemID": material301["data"][0]["ID"],
  "buyBy": user5["data"][0]["ID"],
  "costPerItem": 80,
  "amount": 10
}).json()

order7 = req.post(URL + "item/wantBuy", json={
  "itemID": material349["data"][0]["ID"],
  "buyBy": user5["data"][0]["ID"],
  "costPerItem": 5,
  "amount": 100
}).json()

# allow finished denied order
req.patch(URL + "item/wantBuy/" + order1["data"][0]["ID"] + "?type=allow")
req.patch(URL + "item/wantBuy/" + order2["data"][0]["ID"] + "?type=allow")
req.patch(URL + "item/wantBuy/" + order3["data"][0]["ID"] + "?type=denied")
req.patch(URL + "item/wantBuy/" + order4["data"][0]["ID"] + "?type=denied")
req.patch(URL + "item/wantBuy/" + order5["data"][0]["ID"] + "?type=finished")

# picknpay
picknpay1 = req.post(URL + "item/picknpay", json={
  "itemID": material72["data"][0]["ID"],
  "borrowBy": user7["data"][0]["ID"],
  "amount": 50
}).json()

picknpay2 = req.post(URL + "item/picknpay", json={
  "itemID": material128["data"][0]["ID"],
  "borrowBy": user9["data"][0]["ID"],
  "amount": 10
}).json()

picknpay3 = req.post(URL + "item/picknpay", json={
  "itemID": material194["data"][0]["ID"],
  "borrowBy": user9["data"][0]["ID"],
  "amount": 5
}).json()

picknpay4 = req.post(URL + "item/picknpay", json={
  "itemID": material215["data"][0]["ID"],
  "borrowBy": user10["data"][0]["ID"],
  "amount": 20
}).json()

picknpay5 = req.post(URL + "item/picknpay", json={
  "itemID": material333["data"][0]["ID"],
  "borrowBy": user10["data"][0]["ID"],
  "amount": 80
}).json()

req.patch(URL + "item/picknpay", json={
  "picknpayID": picknpay1["data"][0]["ID"],
  "spendBy": user6["data"][0]["ID"]
})

req.patch(URL + "item/picknpay", json={
  "picknpayID": picknpay4["data"][0]["ID"],
  "spendBy": user8["data"][0]["ID"]
})

# formula
formula1 = req.post(URL + "formula", json={
  "toItem": item1["data"][0]["ID"],
  "name": "สูตรการผลิต เตารีด CB 95 ดำหัวเล็ก",
  "costFormula": 0,
  "detail": "สูตรการผลิต เตารีด CB 95 ดำหัวเล็ก",
  "material":[
    {
      "item": material1["data"][0]["ID"],
      "amount": 1
    },
    {
      "item": material2["data"][0]["ID"],
      "amount": 1
    },
    {
      "item": material6["data"][0]["ID"],
      "amount": 1
    },
    {
      "item": material7["data"][0]["ID"],
      "amount": 1
    },
    {
      "item": material8["data"][0]["ID"],
      "amount": 1
    },
    {
      "item": material9["data"][0]["ID"],
      "amount": 1
    },
    {
      "item": material10["data"][0]["ID"],
      "amount": 1
    },
    {
      "item": material12["data"][0]["ID"],
      "amount": 1
    },
    {
      "item": material13["data"][0]["ID"],
      "amount": 1
    },
    {
      "item": material14["data"][0]["ID"],
      "amount": 1
    },
    {
      "item": material15["data"][0]["ID"],
      "amount": 1
    },
    {
      "item": material16["data"][0]["ID"],
      "amount": 1
    },
    {
      "item": material17["data"][0]["ID"],
      "amount": 1
    },
    {
      "item": material19["data"][0]["ID"],
      "amount": 1
    },
    {
      "item": material136["data"][0]["ID"],
      "amount": 1
    },
    {
      "item": material347["data"][0]["ID"],
      "amount": 1
    }
  ]
}).json()

formula2 = req.post(URL + "formula", json={
  "toItem": item12["data"][0]["ID"],
  "name": "สูตรการผลิต เตารีด JP 87",
  "costFormula": 0,
  "detail": "สูตรการผลิต เตารีด JP 87",
  "material":[
    {
      "item": material28["data"][0]["ID"],
      "amount": 1
    },
    {
      "item": material29["data"][0]["ID"],
      "amount": 1
    },
    {
      "item": material30["data"][0]["ID"],
      "amount": 1
    },
    {
      "item": material31["data"][0]["ID"],
      "amount": 1
    },
    {
      "item": material32["data"][0]["ID"],
      "amount": 1
    },
    {
      "item": material33["data"][0]["ID"],
      "amount": 1
    },
    {
      "item": material34["data"][0]["ID"],
      "amount": 1
    },
    {
      "item": material35["data"][0]["ID"],
      "amount": 1
    },
    {
      "item": material36["data"][0]["ID"],
      "amount": 1
    },
    {
      "item": material37["data"][0]["ID"],
      "amount": 1
    },
    {
      "item": material38["data"][0]["ID"],
      "amount": 1
    },
    {
      "item": material134["data"][0]["ID"],
      "amount": 1
    },
    {
      "item": material135["data"][0]["ID"],
      "amount": 1
    }
  ]
}).json()

formula3 = req.post(URL + "formula", json={
  "toItem": item14["data"][0]["ID"],
  "name": "สูตรการผลิต เตารีด TZ17 น้ำเงิน",
  "costFormula": 0,
  "detail": "สูตรการผลิต เตารีด TZ17 น้ำเงิน",
  "material":[
    {
      "item": material146["data"][0]["ID"],
      "amount": 1
    },
    {
      "item": material153["data"][0]["ID"],
      "amount": 1
    },
    {
      "item": material155["data"][0]["ID"],
      "amount": 1
    },
    {
      "item": material156["data"][0]["ID"],
      "amount": 1
    },
    {
      "item": material157["data"][0]["ID"],
      "amount": 1
    },
    {
      "item": material158["data"][0]["ID"],
      "amount": 1
    },
    {
      "item": material159["data"][0]["ID"],
      "amount": 1
    },
    {
      "item": material160["data"][0]["ID"],
      "amount": 1
    },
    {
      "item": material215["data"][0]["ID"],
      "amount": 1
    },
    {
      "item": material353["data"][0]["ID"],
      "amount": 1
    }
  ]
}).json()

# add plan, lot and detail
plan1 = req.post(URL + "plan", json={
  "planName":"4/2023",
  "startDate":"2023-10-01",
  "endDate":"2023-12-31",
  "detail":"แผนการผลิตสำหรับไตรมาสที่ 4 ปี 2023",
  "productionLot":[
    {
      "name": "ล็อตการผลิตสำหรับโรงงาน A",
      "productionSub": [
        {
          "formulaProject": formula1["data"]["formulaProject"][0]["ID"],
          "amountRequire": 20
        },
        {
          "formulaProject": formula2["data"]["formulaProject"][0]["ID"],
          "amountRequire": 50
        }
      ]
    },
    {
      "name": "ล็อตการผลิตสำหรับโรงงาน B",
      "productionSub": [
        {
          "formulaProject": formula1["data"]["formulaProject"][0]["ID"],
          "amountRequire": 100
        }
      ]
    },
    {
      "name": "ล็อตการผลิตสำหรับเติมของในคลัง",
      "productionSub": [
        {
          "formulaProject": formula1["data"]["formulaProject"][0]["ID"],
          "amountRequire": 20
        },
        {
          "formulaProject": formula2["data"]["formulaProject"][0]["ID"],
          "amountRequire": 60
        },
        {
          "formulaProject": formula3["data"]["formulaProject"][0]["ID"],
          "amountRequire": 30
        }
      ]
    }
  ]
}).json()

plan2 = req.post(URL + "plan", json={
  "planName":"1/2024",
  "startDate":"2024-01-01",
  "endDate":"2024-03-31",
  "detail":"แผนการผลิตสำหรับไตรมาสที่ 1 ปี 2024",
  "productionLot":[
    {
      "name": "ล็อตการผลิตสำหรับโรงงาน A",
      "productionSub": [
        {
          "formulaProject": formula1["data"]["formulaProject"][0]["ID"],
          "amountRequire": 20
        },
        {
          "formulaProject": formula2["data"]["formulaProject"][0]["ID"],
          "amountRequire": 50
        }
      ]
    },
    {
      "name": "ล็อตการผลิตสำหรับโรงงาน B",
      "productionSub": [
        {
          "formulaProject": formula1["data"]["formulaProject"][0]["ID"],
          "amountRequire": 100
        }
      ]
    },
    {
      "name": "ล็อตการผลิตสำหรับเติมของในคลัง",
      "productionSub": [
        {
          "formulaProject": formula1["data"]["formulaProject"][0]["ID"],
          "amountRequire": 20
        },
        {
          "formulaProject": formula2["data"]["formulaProject"][0]["ID"],
          "amountRequire": 60
        },
        {
          "formulaProject": formula3["data"]["formulaProject"][0]["ID"],
          "amountRequire": 30
        }
      ]
    }
  ]
}).json()

plan3 = req.post(URL + "plan", json={
  "planName":"2/2024",
  "startDate":"2024-04-01",
  "endDate":"2024-06-30",
  "detail":"แผนการผลิตสำหรับไตรมาสที่ 2 ปี 2024",
  "productionLot":[
    {
      "name": "ล็อตการผลิตสำหรับโรงงาน A",
      "productionSub": [
        {
          "formulaProject": formula1["data"]["formulaProject"][0]["ID"],
          "amountRequire": 20
        },
        {
          "formulaProject": formula2["data"]["formulaProject"][0]["ID"],
          "amountRequire": 50
        }
      ]
    },
    {
      "name": "ล็อตการผลิตสำหรับโรงงาน B",
      "productionSub": [
        {
          "formulaProject": formula1["data"]["formulaProject"][0]["ID"],
          "amountRequire": 100
        }
      ]
    },
    {
      "name": "ล็อตการผลิตสำหรับเติมของในคลัง",
      "productionSub": [
        {
          "formulaProject": formula1["data"]["formulaProject"][0]["ID"],
          "amountRequire": 20
        },
        {
          "formulaProject": formula2["data"]["formulaProject"][0]["ID"],
          "amountRequire": 60
        },
        {
          "formulaProject": formula3["data"]["formulaProject"][0]["ID"],
          "amountRequire": 30
        }
      ]
    }
  ]
}).json()

plan4 = req.post(URL + "plan", json={
  "planName":"3/2024",
  "startDate":"2024-07-01",
  "endDate":"2024-09-30",
  "detail":"แผนการผลิตสำหรับไตรมาสที่ 3 ปี 2024",
  "productionLot":[
    {
      "name": "ล็อตการผลิตสำหรับโรงงาน A",
      "productionSub": [
        {
          "formulaProject": formula1["data"]["formulaProject"][0]["ID"],
          "amountRequire": 20
        },
        {
          "formulaProject": formula2["data"]["formulaProject"][0]["ID"],
          "amountRequire": 50
        }
      ]
    },
    {
      "name": "ล็อตการผลิตสำหรับโรงงาน B",
      "productionSub": [
        {
          "formulaProject": formula1["data"]["formulaProject"][0]["ID"],
          "amountRequire": 100
        }
      ]
    },
    {
      "name": "ล็อตการผลิตสำหรับเติมของในคลัง",
      "productionSub": [
        {
          "formulaProject": formula1["data"]["formulaProject"][0]["ID"],
          "amountRequire": 20
        },
        {
          "formulaProject": formula2["data"]["formulaProject"][0]["ID"],
          "amountRequire": 60
        },
        {
          "formulaProject": formula3["data"]["formulaProject"][0]["ID"],
          "amountRequire": 30
        }
      ]
    }
  ]
}).json()

plan5 = req.post(URL + "plan", json={
  "planName":"4/2024",
  "startDate":"2024-10-01",
  "endDate":"2024-12-31",
  "detail":"แผนการผลิตสำหรับไตรมาสที่ 4 ปี 2024",
  "productionLot":[
    {
      "name": "ล็อตการผลิตสำหรับโรงงาน A",
      "productionSub": [
        {
          "formulaProject": formula1["data"]["formulaProject"][0]["ID"],
          "amountRequire": 20
        },
        {
          "formulaProject": formula2["data"]["formulaProject"][0]["ID"],
          "amountRequire": 50
        }
      ]
    },
    {
      "name": "ล็อตการผลิตสำหรับโรงงาน B",
      "productionSub": [
        {
          "formulaProject": formula1["data"]["formulaProject"][0]["ID"],
          "amountRequire": 100
        }
      ]
    },
    {
      "name": "ล็อตการผลิตสำหรับเติมของในคลัง",
      "productionSub": [
        {
          "formulaProject": formula1["data"]["formulaProject"][0]["ID"],
          "amountRequire": 20
        },
        {
          "formulaProject": formula2["data"]["formulaProject"][0]["ID"],
          "amountRequire": 60
        },
        {
          "formulaProject": formula3["data"]["formulaProject"][0]["ID"],
          "amountRequire": 30
        }
      ]
    }
  ]
}).json()

plan6 = req.post(URL + "plan", json={
  "planName":"1/2025",
  "startDate":"2025-01-01",
  "endDate":"2025-03-31",
  "detail":"แผนการผลิตสำหรับไตรมาสที่ 1 ปี 2025",
  "productionLot":[
    {
      "name": "ล็อตการผลิตสำหรับโรงงาน A",
      "productionSub": [
        {
          "formulaProject": formula1["data"]["formulaProject"][0]["ID"],
          "amountRequire": 20
        },
        {
          "formulaProject": formula2["data"]["formulaProject"][0]["ID"],
          "amountRequire": 50
        }
      ]
    },
    {
      "name": "ล็อตการผลิตสำหรับโรงงาน B",
      "productionSub": [
        {
          "formulaProject": formula1["data"]["formulaProject"][0]["ID"],
          "amountRequire": 100
        }
      ]
    },
    {
      "name": "ล็อตการผลิตสำหรับเติมของในคลัง",
      "productionSub": [
        {
          "formulaProject": formula1["data"]["formulaProject"][0]["ID"],
          "amountRequire": 20
        },
        {
          "formulaProject": formula2["data"]["formulaProject"][0]["ID"],
          "amountRequire": 60
        },
        {
          "formulaProject": formula3["data"]["formulaProject"][0]["ID"],
          "amountRequire": 30
        }
      ]
    }
  ]
}).json()

plan7 = req.post(URL + "plan", json={
  "planName":"2/2025",
  "startDate":"2025-04-01",
  "endDate":"2025-06-30",
  "detail":"แผนการผลิตสำหรับไตรมาสที่ 2 ปี 2025",
  "productionLot":[
    {
      "name": "ล็อตการผลิตสำหรับโรงงาน A",
      "productionSub": [
        {
          "formulaProject": formula1["data"]["formulaProject"][0]["ID"],
          "amountRequire": 20
        },
        {
          "formulaProject": formula2["data"]["formulaProject"][0]["ID"],
          "amountRequire": 50
        }
      ]
    },
    {
      "name": "ล็อตการผลิตสำหรับโรงงาน B",
      "productionSub": [
        {
          "formulaProject": formula1["data"]["formulaProject"][0]["ID"],
          "amountRequire": 100
        }
      ]
    },
    {
      "name": "ล็อตการผลิตสำหรับเติมของในคลัง",
      "productionSub": [
        {
          "formulaProject": formula1["data"]["formulaProject"][0]["ID"],
          "amountRequire": 20
        },
        {
          "formulaProject": formula2["data"]["formulaProject"][0]["ID"],
          "amountRequire": 60
        },
        {
          "formulaProject": formula3["data"]["formulaProject"][0]["ID"],
          "amountRequire": 30
        }
      ]
    }
  ]
}).json()

plan8 = req.post(URL + "plan", json={
  "planName":"3/2025",
  "startDate":"2025-07-01",
  "endDate":"2025-09-30",
  "detail":"แผนการผลิตสำหรับไตรมาสที่ 3 ปี 2025",
  "productionLot":[
    {
      "name": "ล็อตการผลิตสำหรับโรงงาน A",
      "productionSub": [
        {
          "formulaProject": formula1["data"]["formulaProject"][0]["ID"],
          "amountRequire": 20
        },
        {
          "formulaProject": formula2["data"]["formulaProject"][0]["ID"],
          "amountRequire": 50
        }
      ]
    },
    {
      "name": "ล็อตการผลิตสำหรับโรงงาน B",
      "productionSub": [
        {
          "formulaProject": formula1["data"]["formulaProject"][0]["ID"],
          "amountRequire": 100
        }
      ]
    },
    {
      "name": "ล็อตการผลิตสำหรับเติมของในคลัง",
      "productionSub": [
        {
          "formulaProject": formula1["data"]["formulaProject"][0]["ID"],
          "amountRequire": 20
        },
        {
          "formulaProject": formula2["data"]["formulaProject"][0]["ID"],
          "amountRequire": 60
        },
        {
          "formulaProject": formula3["data"]["formulaProject"][0]["ID"],
          "amountRequire": 30
        }
      ]
    }
  ]
}).json()

plan9 = req.post(URL + "plan", json={
  "planName":"4/2025",
  "startDate":"2025-10-01",
  "endDate":"2025-12-31",
  "detail":"แผนการผลิตสำหรับไตรมาสที่ 4 ปี 2025",
  "productionLot":[
    {
      "name": "ล็อตการผลิตสำหรับโรงงาน A",
      "productionSub": [
        {
          "formulaProject": formula1["data"]["formulaProject"][0]["ID"],
          "amountRequire": 20
        },
        {
          "formulaProject": formula2["data"]["formulaProject"][0]["ID"],
          "amountRequire": 50
        }
      ]
    },
    {
      "name": "ล็อตการผลิตสำหรับโรงงาน B",
      "productionSub": [
        {
          "formulaProject": formula1["data"]["formulaProject"][0]["ID"],
          "amountRequire": 100
        }
      ]
    },
    {
      "name": "ล็อตการผลิตสำหรับเติมของในคลัง",
      "productionSub": [
        {
          "formulaProject": formula1["data"]["formulaProject"][0]["ID"],
          "amountRequire": 20
        },
        {
          "formulaProject": formula2["data"]["formulaProject"][0]["ID"],
          "amountRequire": 60
        },
        {
          "formulaProject": formula3["data"]["formulaProject"][0]["ID"],
          "amountRequire": 30
        }
      ]
    }
  ]
}).json()

plan10 = req.post(URL + "plan", json={
  "planName":"1/2026",
  "startDate":"2026-01-01",
  "endDate":"2026-03-31",
  "detail":"แผนการผลิตสำหรับไตรมาสที่ 4 ปี 2026",
  "productionLot":[
    {
      "name": "ล็อตการผลิตสำหรับโรงงาน A",
      "productionSub": [
        {
          "formulaProject": formula1["data"]["formulaProject"][0]["ID"],
          "amountRequire": 20
        },
        {
          "formulaProject": formula2["data"]["formulaProject"][0]["ID"],
          "amountRequire": 50
        }
      ]
    },
    {
      "name": "ล็อตการผลิตสำหรับโรงงาน B",
      "productionSub": [
        {
          "formulaProject": formula1["data"]["formulaProject"][0]["ID"],
          "amountRequire": 100
        }
      ]
    },
    {
      "name": "ล็อตการผลิตสำหรับเติมของในคลัง",
      "productionSub": [
        {
          "formulaProject": formula1["data"]["formulaProject"][0]["ID"],
          "amountRequire": 20
        },
        {
          "formulaProject": formula2["data"]["formulaProject"][0]["ID"],
          "amountRequire": 60
        },
        {
          "formulaProject": formula3["data"]["formulaProject"][0]["ID"],
          "amountRequire": 30
        }
      ]
    }
  ]
}).json()

# add qc type
qcType1 = req.post(URL + "qc/type", json={"name": "seaward"}).json()
qcType2 = req.post(URL + "qc/type", json={"name": "temperature"}).json()

# add qc main
qcMain1 = req.post(URL + "qc/main", json={
  "qcType": qcType1["data"][0]["ID"],
  "testName": "EBOND_50",
  "detail": "เพื่อทดสอบสายดิน"
}).json()

qcMain2 = req.post(URL + "qc/main", json={
  "qcType": qcType1["data"][0]["ID"],
  "testName": "DCIR",
  "detail": "เพื่อทดสอบการ DCIR"
}).json()

qcMain3 = req.post(URL + "qc/main", json={
  "qcType": qcType1["data"][0]["ID"],
  "testName": "HIPOT_50",
  "detail": "เพื่อทดสอบการ HIPOT_50"
}).json()

qcMain4 = req.post(URL + "qc/main", json={
  "qcType": qcType1["data"][0]["ID"],
  "testName": "power_leakage_test",
  "detail": "เพื่อทดสอบการ power_leakage_test"
}).json()

qcMain5 = req.post(URL + "qc/main", json={
  "qcType": qcType2["data"][0]["ID"],
  "testName": "การทดสอบอุณหภูมิเตารีด",
  "detail": "เพื่อทดสอบการ ว่าเตารีดจ่ายความร้อนเกินหรือไม่"
}).json()

# add qc script
req.post(URL + "qc/script", json={
  "qcMainID": qcMain1["data"][0]["ID"],
  "script": {
    "script_1":"SSSID_HAL_TEST_TYPE_EBOND_50",
    "script_2":0,
    "script_3":0,
    "script_4":"SSSVAL_HAL_TSTART_NONE",
    "script_5":7000,
    "script_6":0,
    "script_7":40,
    "script_8":20,
    "script_9":0,
    "script_10":1500,
    "script_11":0,
    "script_12":0
  }
})
req.post(URL + "qc/script", json={
  "qcMainID": qcMain2["data"][0]["ID"],
  "script": {
    "script_1":"SSSID_HAL_TEST_TYPE_DCIR",
    "script_2":0,
    "script_3":0,
    "script_4":"SSSVAL_HAL_TSTART_NONE",
    "script_5":250,
    "script_6":10,
    "script_7":50,
    "script_8":20,
    "script_9":0,
    "script_10":500,
    "script_11":0,
    "script_12":0
  }
})
req.post(URL + "qc/script", json={
  "qcMainID": qcMain3["data"][0]["ID"],
  "script": {
    "script_1":"SSSID_HAL_TEST_TYPE_HIPOT_50",
    "script_2":0,
    "script_3":0,
    "script_4":"SSSVAL_HAL_TSTART_NONE",
    "script_5":2500,
    "script_6":10,
    "script_7":50,
    "script_8":10,
    "script_9":0,
    "script_10":20,
    "script_11":0,
    "script_12":1
  }
})
req.post(URL + "qc/script", json={
  "qcMainID": qcMain4["data"][0]["ID"],
  "script": {
    "script_1":"SSSID_HAL_TEST_TYPE_PWRLK",
    "script_2":0,
    "script_3":0,
    "script_4":"SSSVAL_HAL_TSTART_NONE",
    "script_5":0,
    "script_6":0,
    "script_7":30,
    "script_8":0,
    "script_9":0,
    "script_10":20,
    "script_11":0,
    "script_12":0,
    "script_13":0,
    "script_14":13,
    "script_15":0,
    "script_16":1
  }
})

# add qc project
qcProject1 = req.post(URL + "qc/project", json={
  "projectName": "class1(3 ขา)",
  "detail": "ชุดการทดสอบสำหรับเตารีด 3 ขา"
}).json()

qcProject2 = req.post(URL + "qc/project", json={
  "projectName": "class2(2 ขา)",
  "detail": "ชุดการทดสอบสำหรับเตารีด 2 ขา"
}).json()

# map qc project to qc main
req.post(URL + "qc/itemProject", json={
  "qcProject": qcProject1["data"][0]["ID"],
  "qcMain": qcMain1["data"][0]["ID"]
})
req.post(URL + "qc/itemProject", json={
  "qcProject": qcProject1["data"][0]["ID"],
  "qcMain": qcMain2["data"][0]["ID"]
})
req.post(URL + "qc/itemProject", json={
  "qcProject": qcProject1["data"][0]["ID"],
  "qcMain": qcMain3["data"][0]["ID"]
})
req.post(URL + "qc/itemProject", json={
  "qcProject": qcProject1["data"][0]["ID"],
  "qcMain": qcMain4["data"][0]["ID"]
})
req.post(URL + "qc/itemProject", json={
  "qcProject": qcProject1["data"][0]["ID"],
  "qcMain": qcMain5["data"][0]["ID"]
})
req.post(URL + "qc/itemProject", json={
  "qcProject": qcProject2["data"][0]["ID"],
  "qcMain": qcMain2["data"][0]["ID"]
})
req.post(URL + "qc/itemProject", json={
  "qcProject": qcProject2["data"][0]["ID"],
  "qcMain": qcMain3["data"][0]["ID"]
})
req.post(URL + "qc/itemProject", json={
  "qcProject": qcProject2["data"][0]["ID"],
  "qcMain": qcMain4["data"][0]["ID"]
})
req.post(URL + "qc/itemProject", json={
  "qcProject": qcProject2["data"][0]["ID"],
  "qcMain": qcMain5["data"][0]["ID"]
})

# collect serial number by planID then add qc record and status
serialNumber1 = req.get(URL + "plan/barcode/" + plan1["data"]["productionPlan"][0]["ID"] + "?limit=999999&page=1").json()
serialNumber2 = req.get(URL + "plan/barcode/" + plan2["data"]["productionPlan"][0]["ID"] + "?limit=999999&page=1").json()
serialNumber3 = req.get(URL + "plan/barcode/" + plan3["data"]["productionPlan"][0]["ID"] + "?limit=999999&page=1").json()
serialNumber4 = req.get(URL + "plan/barcode/" + plan4["data"]["productionPlan"][0]["ID"] + "?limit=999999&page=1").json()
serialNumber5 = req.get(URL + "plan/barcode/" + plan5["data"]["productionPlan"][0]["ID"] + "?limit=999999&page=1").json()

for data in serialNumber1["data"]:
  i = 0
  req.patch(URL + "construct/perPiece", json={"serialNumber":data["ID"], "producedBy": user4["data"][0]["ID"]})
  qcRecord = req.post(URL + "qc/record", json={
    "qcProjectID": qcProject1["data"][0]["ID"],
    "serialNumber": data["ID"],
    "testBy": user3["data"][0]["ID"]
  }).json()
  # EBOND
  status = "Passed" if random.uniform(0,1) > 0.2 else "Failed"
  if status == "Passed": i+=1
  req.post(URL + "qc/status", json={
    "qcRecordID": qcRecord["data"][0]["ID"],
    "qcMainID": qcMain1["data"][0]["ID"],
    "result": "" if status=="Passed" else "result is above upper limit",
    "status": status,
    "detail": "5.8S, 501, 2912.000000"
  })
  # DCIR
  req.post(URL + "qc/status", json={
    "qcRecordID": qcRecord["data"][0]["ID"],
    "qcMainID": qcMain2["data"][0]["ID"],
    "result": "",
    "status": "Passed",
    "detail": "8.5S, 248, 500.000000"
  })
  # HIPOT
  req.post(URL + "qc/status", json={
    "qcRecordID": qcRecord["data"][0]["ID"],
    "qcMainID": qcMain3["data"][0]["ID"],
    "result": "",
    "status": "Passed",
    "detail": "7.0S, 2499, 0.450000"
  })
  # POWER_LEAKAGE
  status = "Passed" if random.uniform(0,1) > 0.2 else "Failed"
  if status == "Passed": i+=1
  req.post(URL + "qc/status", json={
    "qcRecordID": qcRecord["data"][0]["ID"],
    "qcMainID": qcMain4["data"][0]["ID"],
    "result": "" if status=="Passed" else random.choice(["no specific cause detected", "abort key was pressed"]),
    "status": status,
    "detail": "0.0S, 0, 0.000000, 0.000000, 0.000000"
  })
  # Temperature
  status = "Passed" if random.uniform(0,1) > 0.2 else "Failed"
  if status == "Passed": i+=1
  req.post(URL + "qc/status", json={
    "qcRecordID": qcRecord["data"][0]["ID"],
    "qcMainID": qcMain5["data"][0]["ID"],
    "result": "",
    "status": status,
    "detail": "P1000W12301,P1000W12301,233.60,0.03,5.30,0.01,50.00,0.69,51,Pass_Obj" if status=="Passed" else "P1000W12301,P1000W12301,230.60,0.04,5.30,0.01,50.00,0.56,120,Fail[1]"
  })
  if i == 3:
    req.post(URL + "construct/registerProduct", json={"encryptSerialNumber": data["encryptIDValue"]})

for data in serialNumber2["data"]:
  i = 0
  req.patch(URL + "construct/perPiece", json={"serialNumber":data["ID"], "producedBy": user8["data"][0]["ID"]})
  qcRecord = req.post(URL + "qc/record", json={
    "qcProjectID": qcProject1["data"][0]["ID"],
    "serialNumber": data["ID"],
    "testBy": user6["data"][0]["ID"]
  }).json()
  # EBOND
  status = "Passed" if random.uniform(0,1) > 0.2 else "Failed"
  if status == "Passed": i+=1
  req.post(URL + "qc/status", json={
    "qcRecordID": qcRecord["data"][0]["ID"],
    "qcMainID": qcMain1["data"][0]["ID"],
    "result": "" if status=="Passed" else "result is above upper limit",
    "status": status,
    "detail": "5.8S, 501, 2912.000000"
  })
  # DCIR
  req.post(URL + "qc/status", json={
    "qcRecordID": qcRecord["data"][0]["ID"],
    "qcMainID": qcMain2["data"][0]["ID"],
    "result": "",
    "status": "Passed",
    "detail": "8.5S, 248, 500.000000"
  })
  # HIPOT
  req.post(URL + "qc/status", json={
    "qcRecordID": qcRecord["data"][0]["ID"],
    "qcMainID": qcMain3["data"][0]["ID"],
    "result": "",
    "status": "Passed",
    "detail": "7.0S, 2499, 0.450000"
  })
  # POWER_LEAKAGE
  status = "Passed" if random.uniform(0,1) > 0.2 else "Failed"
  if status == "Passed": i+=1
  req.post(URL + "qc/status", json={
    "qcRecordID": qcRecord["data"][0]["ID"],
    "qcMainID": qcMain4["data"][0]["ID"],
    "result": "" if status=="Passed" else random.choice(["no specific cause detected", "abort key was pressed"]),
    "status": status,
    "detail": "0.0S, 0, 0.000000, 0.000000, 0.000000"
  })
  # Temperature
  status = "Passed" if random.uniform(0,1) > 0.2 else "Failed"
  if status == "Passed": i+=1
  req.post(URL + "qc/status", json={
    "qcRecordID": qcRecord["data"][0]["ID"],
    "qcMainID": qcMain5["data"][0]["ID"],
    "result": "",
    "status": status,
    "detail": "P1000W12301,P1000W12301,233.60,0.03,5.30,0.01,50.00,0.69,51,Pass_Obj" if status=="Passed" else "P1000W12301,P1000W12301,230.60,0.04,5.30,0.01,50.00,0.56,120,Fail[1]"
  })
  if i == 3:
    req.post(URL + "construct/registerProduct", json={"encryptSerialNumber": data["encryptIDValue"]})

for data in serialNumber3["data"]:
  req.patch(URL + "construct/perPiece", json={"serialNumber":data["ID"], "producedBy": user9["data"][0]["ID"]})
  qcRecord = req.post(URL + "qc/record", json={
    "qcProjectID": qcProject1["data"][0]["ID"],
    "serialNumber": data["ID"],
    "testBy": user7["data"][0]["ID"]
  }).json()
  # EBOND
  status = "Passed" if random.uniform(0,1) > 0.2 else "Failed"
  req.post(URL + "qc/status", json={
    "qcRecordID": qcRecord["data"][0]["ID"],
    "qcMainID": qcMain1["data"][0]["ID"],
    "result": "" if status=="Passed" else "result is above upper limit",
    "status": status,
    "detail": "5.8S, 501, 2912.000000"
  })
  # DCIR
  req.post(URL + "qc/status", json={
    "qcRecordID": qcRecord["data"][0]["ID"],
    "qcMainID": qcMain2["data"][0]["ID"],
    "result": "",
    "status": "Passed",
    "detail": "8.5S, 248, 500.000000"
  })
  # HIPOT
  req.post(URL + "qc/status", json={
    "qcRecordID": qcRecord["data"][0]["ID"],
    "qcMainID": qcMain3["data"][0]["ID"],
    "result": "",
    "status": "Passed",
    "detail": "7.0S, 2499, 0.450000"
  })
  # POWER_LEAKAGE
  status = "Passed" if random.uniform(0,1) > 0.2 else "Failed"
  req.post(URL + "qc/status", json={
    "qcRecordID": qcRecord["data"][0]["ID"],
    "qcMainID": qcMain4["data"][0]["ID"],
    "result": "" if status=="Passed" else random.choice(["no specific cause detected", "abort key was pressed"]),
    "status": status,
    "detail": "0.0S, 0, 0.000000, 0.000000, 0.000000"
  })
  # Temperature
  status = "Passed" if random.uniform(0,1) > 0.2 else "Failed"
  req.post(URL + "qc/status", json={
    "qcRecordID": qcRecord["data"][0]["ID"],
    "qcMainID": qcMain5["data"][0]["ID"],
    "result": "",
    "status": status,
    "detail": "P1000W12301,P1000W12301,233.60,0.03,5.30,0.01,50.00,0.69,51,Pass_Obj" if status=="Passed" else "P1000W12301,P1000W12301,230.60,0.04,5.30,0.01,50.00,0.56,120,Fail[1]"
  })

for data in serialNumber4["data"]:
  req.patch(URL + "construct/perPiece", json={"serialNumber":data["ID"], "producedBy": user10["data"][0]["ID"]})
  qcRecord = req.post(URL + "qc/record", json={
    "qcProjectID": qcProject1["data"][0]["ID"],
    "serialNumber": data["ID"],
    "testBy": user5["data"][0]["ID"]
  }).json()
  # EBOND
  status = "Passed" if random.uniform(0,1) > 0.2 else "Failed"
  req.post(URL + "qc/status", json={
    "qcRecordID": qcRecord["data"][0]["ID"],
    "qcMainID": qcMain1["data"][0]["ID"],
    "result": "" if status=="Passed" else "result is above upper limit",
    "status": status,
    "detail": "5.8S, 501, 2912.000000"
  })
  # DCIR
  req.post(URL + "qc/status", json={
    "qcRecordID": qcRecord["data"][0]["ID"],
    "qcMainID": qcMain2["data"][0]["ID"],
    "result": "",
    "status": "Passed",
    "detail": "8.5S, 248, 500.000000"
  })
  # HIPOT
  req.post(URL + "qc/status", json={
    "qcRecordID": qcRecord["data"][0]["ID"],
    "qcMainID": qcMain3["data"][0]["ID"],
    "result": "",
    "status": "Passed",
    "detail": "7.0S, 2499, 0.450000"
  })
  # POWER_LEAKAGE
  status = "Passed" if random.uniform(0,1) > 0.2 else "Failed"
  req.post(URL + "qc/status", json={
    "qcRecordID": qcRecord["data"][0]["ID"],
    "qcMainID": qcMain4["data"][0]["ID"],
    "result": "" if status=="Passed" else random.choice(["no specific cause detected", "abort key was pressed"]),
    "status": status,
    "detail": "0.0S, 0, 0.000000, 0.000000, 0.000000"
  })
  # Temperature
  status = "Passed" if random.uniform(0,1) > 0.2 else "Failed"
  req.post(URL + "qc/status", json={
    "qcRecordID": qcRecord["data"][0]["ID"],
    "qcMainID": qcMain5["data"][0]["ID"],
    "result": "",
    "status": status,
    "detail": "P1000W12301,P1000W12301,233.60,0.03,5.30,0.01,50.00,0.69,51,Pass_Obj" if status=="Passed" else "P1000W12301,P1000W12301,230.60,0.04,5.30,0.01,50.00,0.56,120,Fail[1]"
  })

i = 0
for data in serialNumber5["data"]:
  req.patch(URL + "construct/perPiece", json={"serialNumber":data["ID"], "producedBy": user4["data"][0]["ID"]})
  qcRecord = req.post(URL + "qc/record", json={
    "qcProjectID": qcProject1["data"][0]["ID"],
    "serialNumber": data["ID"],
    "testBy": user6["data"][0]["ID"]
  }).json()
  # EBOND
  status = "Passed" if random.uniform(0,1) > 0.2 else "Failed"
  req.post(URL + "qc/status", json={
    "qcRecordID": qcRecord["data"][0]["ID"],
    "qcMainID": qcMain1["data"][0]["ID"],
    "result": "" if status=="Passed" else "result is above upper limit",
    "status": status,
    "detail": "5.8S, 501, 2912.000000"
  })
  # DCIR
  req.post(URL + "qc/status", json={
    "qcRecordID": qcRecord["data"][0]["ID"],
    "qcMainID": qcMain2["data"][0]["ID"],
    "result": "",
    "status": "Passed",
    "detail": "8.5S, 248, 500.000000"
  })
  # HIPOT
  req.post(URL + "qc/status", json={
    "qcRecordID": qcRecord["data"][0]["ID"],
    "qcMainID": qcMain3["data"][0]["ID"],
    "result": "",
    "status": "Passed",
    "detail": "7.0S, 2499, 0.450000"
  })
  # POWER_LEAKAGE
  status = "Passed" if random.uniform(0,1) > 0.2 else "Failed"
  req.post(URL + "qc/status", json={
    "qcRecordID": qcRecord["data"][0]["ID"],
    "qcMainID": qcMain4["data"][0]["ID"],
    "result": "" if status=="Passed" else random.choice(["no specific cause detected", "abort key was pressed"]),
    "status": status,
    "detail": "0.0S, 0, 0.000000, 0.000000, 0.000000"
  })
  # Assume that this plan never qc with Temperature test
  # break this qc
  i += 1
  if i > 200:
    break