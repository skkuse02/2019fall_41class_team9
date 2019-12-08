import pymysql

conn = pymysql.connect(host = '122.35.250.147', user='root', password ='Znzltkfkd1', db = 'userdb', charset = 'utf8')


data_set =[
['치킨',0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,12000,0]
,['돼지국밥',1,0,0,0,1,1,0,1,0,0,0,1,0,0,0,8000,1]
,['국수',1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,6000,1]
,['햄버거',0,0,0,1,1,0,1,1,0,0,0,0,0,0,1,7000,1]
,['삼겹살',1,0,0,0,1,0,0,1,0,0,0,0,0,0,0,10000,0]] #음식 data set

print(data_set)

user_DB = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] #user 음식 자료 저장 DB

def first_user_DB():

    select_first = ['치킨','국수','삼겹살'] #user가 회원가입시 고른 음식

    for i in range(0,len(data_set)):
        for j in select_first:
            if data_set[i][0] == j:
                for k in range(1,16):
                    user_DB[k-1] = user_DB[k-1]+data_set[i][k] #user가 회원가입시 고른 음식으로 정보 DB에 추가

    print(user_DB)

def add_user_DB():
    user_select = [10000,1] #user가 밥먹을때 정한 값

    filtering_list = []

    for i in range(0,len(data_set)):
        if data_set[i][16] <= user_select[0]:
            if user_select[1] == 1:
                if data_set[i][17] == 1:
                    filtering_list.append(data_set[i])
            elif user_select[1] == 0:
                filtering_list.append(data_set[i])
                

    print(filtering_list)

    food_ranking_score = []

    for i in range(0,len(filtering_list)):
        food_ranking_score.append([0,filtering_list[i][0]])
        
        for j in range(0,15):
            food_ranking_score[i][0] = food_ranking_score[i][0] + (filtering_list[i][j+1] * user_DB[j])


    print(food_ranking_score) 

    food_ranking_score.sort()

    print(food_ranking_score)

    food_ranking_score.reverse()

    print(food_ranking_score) #[음식 점수, 음식이름] 점수 높은 순서

    food_ranking_name = []

    for i in range(0,len(filtering_list)):
        food_ranking_name.append(food_ranking_score[i][1])

    print(food_ranking_name) #추천 알고리즘을 지난 후 음식 Ranking List

    food_pick = '햄버거' #user가 추천 음식 중 선택한 음식

    for i in range(0,len(filtering_list)):
        if food_pick == filtering_list[i][0]:
            for k in range(1,16):
                 user_DB[k-1] = user_DB[k-1]+filtering_list[i][k]
    
    print(user_DB) #새로 만들어진 user 음식 자료 저장 DB


first_user_DB()
add_user_DB()
