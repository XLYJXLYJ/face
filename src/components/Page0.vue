<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;padding-top:16px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="nameid" placeholder="姓名" @keyup.13="getid"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getid">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">人员注册</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="cardAdd">人员卡号注册</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="cardUpdate">人员更新</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="settime">时间段权限设置</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="dsettime">删除时间段权限设置</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		 <transition name="el-fade-in-linear">
				<el-dialog :visible.sync="dialogLogin"  width="480px" :modal="true" :modal-append-to-body="false" :lock-scroll="false" :show-close="false">
					<div class="registercontain" v-show="registerShow">
							<el-form label-width="90px">
								<el-form-item label="请输入id">
									<el-input v-model="formLogin.id" placeholder="请输入id"></el-input>
								</el-form-item>
									<br>
								<el-form-item label="idcardNum">
									<el-input v-model="formLogin.idcardNum" placeholder="请输入idcardNum"></el-input>
								</el-form-item>
									<br>
								<el-form-item label="请输入姓名">
									<el-input v-model="formLogin.userName" placeholder="请输入姓名"></el-input>
								</el-form-item>
									<br>
									<el-button class="register" @click.prevent="Loginbtn" type="primary">人员注册</el-button>
							</el-form> 
					</div>
				</el-dialog> 
		</transition>

		<transition name="el-fade-in-linear">
				<el-dialog :visible.sync="dialogcard"  width="480px" :modal="true" :modal-append-to-body="false" :lock-scroll="false" :show-close="false">
					<div class="registercontain" v-show="cardShow">
							<el-form label-width="90px">
								<el-form-item label="请输入id">
									<el-input v-model='personId' placeholder="请输入id"></el-input>
								</el-form-item>
									<br>
									<el-button class="register" @click.prevent="cardbtn" type="primary">人员卡号注册</el-button>
							</el-form> 
					</div>
				</el-dialog> 
		</transition>

		<transition name="el-fade-in-linear">
				<el-dialog :visible.sync="dialogUpdate"  width="480px" :modal="true" :modal-append-to-body="false" :lock-scroll="false" :show-close="false">
					<div class="registercontain" v-show="updateShow">
							<el-form label-width="90px">
								<el-form-item label="请输入id">
									<el-input v-model="formUpdate.id" placeholder="请输入id"></el-input>
								</el-form-item>
									<br>
								<el-form-item label="idcardNum">
									<el-input v-model="formUpdate.idcardNum" placeholder="请输入idcardNum"></el-input>
								</el-form-item>
									<br>
								<el-form-item label="请输入姓名">
									<el-input v-model="formUpdate.userName" placeholder="请输入姓名"></el-input>
								</el-form-item>
									<br>
									<el-button class="register" @click.prevent="updatebtn" type="primary">人员更新</el-button>
							</el-form> 
					</div>
				</el-dialog> 
		</transition>

		<transition name="el-fade-in-linear">
				<el-dialog :visible.sync="dialogtime"  width="480px" :modal="true" :modal-append-to-body="false" :lock-scroll="false" :show-close="false">
					<div class="registercontain" v-show="timeShow">
							<el-form label-width="90px">
								<el-form-item label="请输入id">
									<el-input v-model="formtime.personId" placeholder="请输入id"></el-input>
								</el-form-item>
									<br>
								<el-form-item label="输入时间段">
									<el-input v-model="formtime.passtime" placeholder="例：09:00:00,11:00:00"></el-input>
								</el-form-item>
									<br>
									<el-button class="register01" @click.prevent="timebtn" type="primary">设置时间权限</el-button>
							</el-form> 
					</div>
				</el-dialog> 
		</transition>

		<transition name="el-fade-in-linear">
				<el-dialog :visible.sync="ddialogtime"  width="480px" :modal="true" :modal-append-to-body="false" :lock-scroll="false" :show-close="false">
					<div class="registercontain" v-show="dtimeShow">
							<el-form label-width="90px">
								<el-form-item label="请输入id">
									<el-input v-model="dpersonId" placeholder="请输入id"></el-input>
								</el-form-item>
									<br>
									<br>
									<el-button class="register02" @click.prevent="deletetimebtn" type="primary">删除时间权限</el-button>
							</el-form> 
					</div>
				</el-dialog> 
		</transition>


		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" label="序号" width="60">
			</el-table-column>
			<el-table-column prop="id" label="id" width="100" sortable>
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="160" sortable>
			</el-table-column>
			<el-table-column prop="idcardNum" label="卡号" width="160" sortable>
			</el-table-column>
			<el-table-column prop="createTime" label="注册时间" width="200" :formatter="formatDate" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<!-- <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			:current-page.sync="currentPage3"
			background
			@current-change ="handleCurrentChange"
			@prev-click="Selectpagebefore"
			@next-click="Selectpageafter"
			layout="prev, pager, next, jumper"
			:total.sync="listnumtotal"
			prev-text='上一页'
			next-text='下一页'>
		</el-pagination>
		<!--工具条-->		
		<br>
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;padding-top:16px;">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>


	</section>
</template>

<script>
var qs = require('qs');
var moment = require('moment');
	export default {
		data() {
			return {
				listnumtotal:0,
				currentPage3:0,
				cur_page:'',//当前页数
				filters: {
					name: ''
				},
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列
				registerShow:'',
				dialogLogin:false,
				dialogcard:false,
				cardShow:'',
				dialogUpdate:false,
				updateShow:'',
				nameid:'',
				dialogtime:false,
				timeShow:'',
				ddialogtime:false,
				dtimeShow:'',
				formLogin: {
						pass:'create1',
						userName: '',
						id: '',
						idcardNum:''
				},
				formUpdate: {
					pass:'create1',
					userName: '',
					id: '',
					idcardNum:''
				},
				formtime: {
					passtime: '',
					personId: '',
				},
				dpersonId: '',
				personId: '',
			}
		},
		methods: {
			formatDate:function(row, column) {
				var date = row[column.property];
			          if (date == undefined) {
			             return "";
			          }
           		return moment(date).format("YYYY-MM-DD HH:mm:ss");
			},
			Loginbtn(){
				this.axios.post('/person/create',
				qs.stringify({
					pass:'create1',
					userName: this.formLogin.userName,//用户输入的名称
					id: this.formLogin.id,
					idcardNum:this.formLogin.idcardNum
				}),
				{
					headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
					'Access-Control-Allow-Headers':'*'},
				})
				.then(response => {
					this.serialNumber=response.data.data
					console.log(response.data.data)
				})
				.catch(function (error) {
					console.log(error);
				});
			},
			cardbtn(){
				this.axios.post('/face/icCardRegist',
				qs.stringify({
					pass:'create1',
					personId:this.personId
				}),
				{
					headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
					'Access-Control-Allow-Headers':'*'},
				})
				.then(response => {
					this.serialNumber=response.data.data
					console.log(response.data.data)
				})
				.catch(function (error) {
					console.log(error);
				});
			},
			updatebtn(){
				this.axios.post('/person/update',
				qs.stringify({
						pass:'create1',
						userName: this.formUpdate.userName,//用户输入的名称
						id: this.formUpdate.id,
						idcardNum:this.formUpdate.idcardNum
				}),
				{
					headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
					'Access-Control-Allow-Headers':'*'},
				})
				.then(response => {
				})
				.catch(function (error) {
					console.log(error);
				});
			},
			getid(){
				this.axios.post('/person/find',
				qs.stringify({
					pass:'create1',
					id:this.nameid
				}),
				{
					headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
					'Access-Control-Allow-Headers':'*'},
				})
				.then(response => {
					// console.log(response)
					this.listLoading = false;
					console.log(response.data.data)
					this.users=response.data.data
				})
				.catch(function (error) {
					console.log(error);
				});
			},
			timebtn(){
				this.axios.post('/person/creatPasstime',
				qs.stringify({
					pass:'create1',
					personId:this.formtime.personId?this.formtime.personId:-1,
					passtime:this.formtime.passtime
				}),
				{
					headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
					'Access-Control-Allow-Headers':'*'},
				})
				.then(response => {
					this.serialNumber=response.data.data
					console.log(response.data.data)
				})
				.catch(function (error) {
					console.log(error);
				});
			},
			timebtn(){
				this.axios.post('/person/deletePasstime',
				qs.stringify({
					pass:'create1',
					personId:this.formtime.personId?this.formtime.personId:-1
				}),
				{
					headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
					'Access-Control-Allow-Headers':'*'},
				})
				.then(response => {
					this.serialNumber=response.data.data
					console.log(response.data.data)
				})
				.catch(function (error) {
					console.log(error);
				});
			},
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
				this.axios.post('/person/findByPage',
				qs.stringify({
					pass:'create1',
					personId:-1
				}),
				{
					headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
					'Access-Control-Allow-Headers':'*'},
				})
				.then(response => {
					// console.log(response)
					this.listLoading = false;
					console.log(response.data.data.personInfos)
					this.users=response.data.data.personInfos
					this.listnumtotal=response.data.data.pageInfo.total
				})
				.catch(function (error) {
					this.$confirm('没有查询到相关的数据?', '提示', {
						type: 'warning'
					})
				});
			},
			//获取当前页数
			handleCurrentChange(val){
				this.cur_page = val;
				this.currentPage3=val;
				this.getData()
			},

			// 前页数
			Selectpagebefore(){
				this.cur_page = this.cur_page-1
				this.getData()
			},
			// 后页数
			Selectpageafter(){
				this.cur_page = this.cur_page+1
				this.getData()
			},
			//根据页数获取数据
			getData(){
				this.axios.get('/findRecords?pass=create1&personId=-1&length=10&index='+this.cur_page,
				{
					headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
					'Access-Control-Allow-Headers':'*'},
				})
				.then(response => {  
					this.users=response.data.data.records
					this.listnumtotal=response.data.data.pageInfo.total
				})
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };
					removeUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
			},
			//显示新增界面
			handleAdd: function () {
				this.dialogLogin = true;
				this.registerShow = true;
			},
			cardAdd: function () {
				this.dialogcard = true;
				this.cardShow = true;
			},
			cardUpdate: function () {
				this.dialogUpdate = true;
				this.updateShow = true;
			},
			settime: function () {
				this.dialogtime = true;
				this.timeShow = true;
			},
			dsettime: function () {
				this.ddialogtime = true;
				this.dtimeShow = true;
			},
			//编辑
			editSubmit: function () {

			},
			//新增
			addSubmit: function () {

			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids };
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			}
		},
		mounted() {
			this.getUsers();
			var pass = sessionStorage.getItem('pass');
			if (pass) {
				pass = JSON.parse(pass);
			}else{
				this.$router.push({ path: '/' });
			}
		}
	}

</script>

<style scoped>
.registercontain{
    margin: 0px;
    padding: 0px;
    width: 100%;
    height: 306px;
    /* background: @background-color; */
    border-radius: 60px;
}
.registercontain .register{
    position: absolute;
    height: 38px;
    width: 110px;
    top: 296px;
    left: 41%;
    /* background: @main-color;
    color: @background-color;
    font-size:@md-size; */
    cursor: pointer;
    border: none;
    outline: none;
    border-radius: 4px;
}
.registercontain .register01{
    position: absolute;
    height: 38px;
    width: 130px;
    top: 296px;
    left: 42%;
    /* background: @main-color;
    color: @background-color;
    font-size:@md-size; */
    cursor: pointer;
    border: none;
    outline: none;
    border-radius: 4px;
}
.registercontain .register02{
    position: absolute;
    height: 38px;
    width: 130px;
    top: 296px;
    left: 42%;
    /* background: @main-color;
    color: @background-color;
    font-size:@md-size; */
    cursor: pointer;
    border: none;
    outline: none;
    border-radius: 4px;
}
</style>