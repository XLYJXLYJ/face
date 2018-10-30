<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;padding-top:16px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="nameid" placeholder="请输入Id" @keyup.13="getid"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getid">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleEdit">识别记录删除</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		 <transition name="el-fade-in-linear">
				<el-dialog :visible.sync="dialogLogin"  width="480px" :modal="true" :modal-append-to-body="false" :lock-scroll="false" :show-close="false">
					<div class="registercontain" v-show="registerShow">
							<el-form label-width="90px">
								<el-form-item label="personId">
									<el-input v-model="formLogin.personId" placeholder="请输入personId"></el-input>
								</el-form-item>
									<br>
								<el-form-item label="faceId">
									<el-input v-model="formLogin.faceId" placeholder="请输入faceId"></el-input>
								</el-form-item>
									<br>
								<el-form-item label="照片">
									<el-upload
									class="upload-demo"
									action=''
									:on-change="choise_file"
									list-type="picture">
									<el-button size="small" type="primary">选择图片</el-button>
									</el-upload>
								</el-form-item>
									<br>
									<el-button class="register" type="primary">注册</el-button>
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
									<el-button class="register" @click.prevent="cardbtn" type="primary">拍照注册</el-button>
							</el-form> 
					</div>
				</el-dialog> 
		</transition>

		<transition name="el-fade-in-linear">
				<el-dialog :visible.sync="dialogUpdate"  width="480px" :modal="true" :modal-append-to-body="false" :lock-scroll="false" :show-close="false">
					<div class="registercontain" v-show="updateShow">
							<el-form label-width="90px">
									<br>
								<el-form-item label="删除时间">
									<el-input v-model="deletefaceId" placeholder="格式:2017-07-15 12:05:00"></el-input>
								</el-form-item>
									<br>
									<br>
									<el-button class="register" @click.prevent="Loginbtn" type="primary">更新</el-button>
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
			<el-table-column prop="personId" label="personId" width="160" sortable>
			</el-table-column>
			<el-table-column prop="path" label="照片" width="160" sortable>
				<template slot-scope="scope"> 
					<img :src="scope.row.path" width="100" height="100"/> 
				</template> 
			</el-table-column>
			<el-table-column prop="time" label="time" width="160" :formatter="formatDate" sortable>
			</el-table-column>
			<!-- <el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<el-button size="small" @click="handleEdit(users)">更新</el-button>
					<el-button type="danger" size="small" @click="handleDel(users)">删除</el-button>
				</template>
			</el-table-column> -->
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
	</section>

</template>

<script>
var qs = require('qs');
var moment = require('moment');
	export default {
		data() {
			return {
				deletefaceId:'',
				listnumtotal:0,
				currentPage3:0,
				cur_page:'',//当前页数
				filters: {
					name: ''
				},
				users: [],
				total:0,
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
				imageUrl:'',
				imageUpdateUrl:'',
				formLogin: {
					pass:'create1',
					personId: '',
					faceId: '',
					imgBase64:''
				},
				faceId:'',
				formUpdate: {
					pass:'create1',
					personId: '',
					faceId: '',
				},
				formtime: {
					passtime: '',
					id: '',
				},
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
			handleEdit: function (users) {
				console.log(users[0].faceId)
				console.log(users[0].personId)
				this.formUpdate.faceId = users[0].faceId
				this.formUpdate.personId = users[0].personId
				this.dialogUpdate = true;
				this.updateShow = true;
			},
			Loginbtn(){
				this.axios.post('/deleteRecords',
				qs.stringify({
					pass:'create1',
					time: this.deletefaceId,
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
			cardbtn(){
				this.axios.post('/face/takeImg',
				qs.stringify({
					pass:'create1',
					personId:this.personId
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
			updatebtn(){
				this.axios.post('/face/update',
				qs.stringify({
					pass:'create1',
					personId: this.formLogin.personId,//用户输入的名称
					faceId: this.formLogin.faceId,
					imgBase64:this.formLogin.imageUpdateUrl
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
				this.axios.get('/findRecords?pass=create1&personId='+this.nameid+'&length=10&index=0&startTime=0&endTime=0',
				{
					headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
					'Access-Control-Allow-Headers':'*'},
				})
				.then(response => {  
					this.users=response.data.data.records
					this.listnumtotal=response.data.data.pageInfo.total
				})
			},
			timebtn(){
				this.axios.post('/face/creatPasstime',
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
				this.axios.post('/face/deletePasstime',
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
			choise_file (file) {
				let reader = new FileReader()
				reader.onload = () => {
					let _base64 = reader.result
					this.imageUpdateUrl = _base64.split(",")[1];
				}
				reader.readAsDataURL(file.raw)  
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
				this.axios.get('/findRecords?pass=create1&personId=-1&length=10&index=0&startTime=0&endTime=0',
				// qs.stringify({
				// 	params:{
				// 		pass:'create1',
				// 		personId:-1,
				// 		length:-1,
				// 		index:0,
				// 		startTime:0,
				// 		endTime:0
				// 	}
				// }),
				{
					headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
					'Access-Control-Allow-Headers':'*'},
				})
				.then(response => {
					// console.log(response)
					this.listLoading = false;
					console.log(response.data.data)
					this.users=response.data.data.records
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
				this.axios.get('/findRecords?pass=create1&personId=-1&length=10&index='+this.cur_page+'&startTime=0&endTime=0',
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
			handleDel: function (users) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					this.axios.post('/face/find',
					qs.stringify({
						pass:'create1',
						faceId:-1
					}),
					{
						headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
						'Access-Control-Allow-Headers':'*'},
					})
					.then(response => {
						this.listLoading = false;
					})
					.catch(function (error) {
						this.$confirm('没有查询到相关的数据?', '提示', {
							type: 'warning'
						})
					});
				}).catch(() => {

				});
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
    left: 21%;
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
    left: 61%;
    /* background: @main-color;
    color: @background-color;
    font-size:@md-size; */
    cursor: pointer;
    border: none;
    outline: none;
    border-radius: 4px;
}
</style>