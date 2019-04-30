<template>
  <div class="pos">
    <el-row>
      <el-col :span="7" class="pos-order" id="order-list">
        <el-tabs>
          <el-tab-pane label="点餐" >
            <el-table :data="tableData" border style="width:100%">
              <el-table-column prop="goodsName" label="商品名称"></el-table-column>
              <el-table-column prop="count" label="数量" width="50"></el-table-column>
              <el-table-column prop="price" label="金额" width="70"></el-table-column>
              <el-table-column label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="delSingleGoods(scope.row)">删除</el-button>
                <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>

              </template>
              </el-table-column>

            </el-table>
            <div class="total-div">
              数量：{{totalCount}}  &nbsp;&nbsp;&nbsp;&nbsp;金额： {{totalMoney}}元
            </div>

            <div class="btn-order">
              <el-button type="warning">挂单</el-button>
              <el-button type="danger" @click="delAllGoods">删除</el-button>
              <el-button type="success" @click="checkOut">结账</el-button>
            </div>

          </el-tab-pane>
          <el-tab-pane label="挂单">
            挂单
          </el-tab-pane>
          <el-tab-pane label="外卖">
            外卖
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="17">
        <div class="often-goods">
          <div class="often-title">常用商品</div>
          <div class="often-goods-list">
            <ul>
              <li v-for="item of oftenGoods"  @click="addOrderList(item)">
                <span>{{item.goodsName}}</span>
                <span class="oprice">${{item.price}}元</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="goods-type">
          <el-tabs>
            <el-tab-pane label="汉堡" >
              <div>
                <ul class="cooklist">
                  <li v-for="item of type0Goods" @click="addOrderList(item)">
                    <span class="foodImg"><!--<img :src="item.goodsImg" width="100%">--></span>
                    <span class="foodName">{{item.goodsName}}</span>
                    <span class="foodPrice">￥{{item.price}}元</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="小食">
              <div>
                <ul class="cooklist">
                  <li v-for="item of type1Goods" @click="addOrderList(item)">
                    <span class="foodImg"><!--<img :src="item.goodsImg" width="100%">--></span>
                    <span class="foodName">{{item.goodsName}}</span>
                    <span class="foodPrice">￥{{item.price}}元</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="饮料">
              <div>
                <ul class="cooklist">
                  <li v-for="item of type2Goods" @click="addOrderList(item)">
                    <span class="foodImg"><!--<img :src="item.goodsImg" width="100%">--></span>
                    <span class="foodName">{{item.goodsName}}</span>
                    <span class="foodPrice">￥{{item.price}}元</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="套餐">
              <div>
                <ul class="cooklist">
                  <li v-for="item of type3Goods" @click="addOrderList(item)">
                    <span class="foodImg"><!--<img :src="item.goodsImg" width="100%">--></span>
                    <span class="foodName">{{item.goodsName}}</span>
                    <span class="foodPrice">￥{{item.price}}元</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>

      </el-col>

    </el-row>

  </div>
</template>
<script>
  import axios from 'axios';

  export default {
    name:'Pos',
    data(){
      return{
        totalMoney:0,
        totalCount:0,
        tableData: [],
        type0Goods:[],
        type1Goods:[],
        type2Goods:[],
        type3Goods:[],
        oftenGoods:[]
      }
    },
    created(){
      axios.get('https://www.easy-mock.com/mock/5b8b30dbf032f03c5e71de7f/kuaican/oftenGoods')
        .then(res=>{
          // console.log(res);
          this.oftenGoods=res.data;

        })
        .catch(error=>{
          console.log(error)
        }),
        axios.get('https://www.easy-mock.com/mock/5b8b30dbf032f03c5e71de7f/kuaican/typeGoods')
          .then(response=>{
            // console.log(response);
            //this.oftenGoods=response.data;
            this.type0Goods=response.data[0];
            this.type1Goods=response.data[1];
            this.type2Goods=response.data[2];
            this.type3Goods=response.data[3];
          })
          .catch(error=>{
            console.log(error);
            alert('网络错误，不能访问');
          })
    },
    mounted() {
      var orderHeight=document.body.clientHeight
      // console.log(orderHeight)
      document.getElementById('order-list').style.height=orderHeight+'px'
    },
    methods:{
      addOrderList(goods){
        let isHave=false;
        this.totalMoney=0;
        this.totalCount=0;

        // 判定是否在订单列表中
        for(let i =0;i<this.tableData.length;i++){
          if(this.tableData[i].goodsId===goods.goodsId){
            isHave=true;
          }
        }
        if(isHave){
          // 改变列表中商品数量
          let arr=this.tableData.filter(o=>o.goodsId===goods.goodsId)
          arr[0].count++
          // console.log(arr)
        }else{
          let newGoods={goodsId:goods.goodsId,goodsName:goods.goodsName,price:goods.price,count:1}
          this.tableData.push(newGoods)
        }
        this.getAllMoney()

      },
      // 删除商品
      delSingleGoods(good){
        // console.log(good);
        this.tableData=this.tableData.filter(a=>a.goodsId!=good.goodsId)//厉害
        this.getAllMoney()
      },
      // 汇总数量 金额
      getAllMoney(){
        this.totalCount=0;
        this.totalMoney=0;
        if(this.tableData){
          this.tableData.forEach(ele=>{
            this.totalCount+=ele.count;
            this.totalMoney+=ele.price*ele.count
          })
        }

      },
      // 删除全部
      delAllGoods(){
        this.totalCount=0;
        this.totalMoney=0;
        this.tableData=[];
      },
      // 结账
      checkOut(){
        if(this.totalCount!=0){
          this.totalCount=0;
          this.totalMoney=0;
          this.tableData=[];
          this.$message({   // element 提供的方法
            message:'结账成功',
            type:'success'
          })
        }
        else{
          this.$message.error('还不能结账')
        }
      }
    }
  }
</script>
<style scoped>
.pos-order{
  background-color: #F9FAFC;
  border-right:1px solid #C0CCDA;

}
  .btn-order{
    text-align:center;
    margin-top:10px;
  }
  .often-title{
    height:20px;
    background: #F9FAFC;
    padding:10px;
    border-bottom:1px solid #D3DCE6;
    text-align:left;
  }
  .often-goods-list ul li{
    list-style:none;
    float:left;
    border:1px solid #E5E9F2;
    padding:10px;
    margin:10px;
    background-color:#fff;

  }
  .oprice{
    color:#58B7FF
  }
  .goods-type{
    clear:both;
  }
.cookList li{
  list-style: none;
  width:23%;
  border:1px solid #E5E9F2;
  height: auto;
  overflow: hidden;
  background-color:#fff;
  padding: 2px;
  float:left;
  margin: 2px;
}
.cookList li span{
  display: block;
  float:left;
  cursor:pointer;
}
.foodImg{
  width: 40%;
}
.foodName{
  font-size: 18px;
  padding-left: 10px;
  color:brown;
}
.foodPrice{
  font-size: 16px;
  padding-left: 10px;
  padding-top:10px;
}
  .total-div{
    background: #fff;
    border-bottom:1px solid #ccc;
    text-align:center
  }
</style>