<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;padding-top:16px;">
			<el-form :inline="true" :model="filters">
				<!-- <el-form-item>
					<el-input v-model="nameid" placeholder="姓名" @keyup.13="getid"></el-input>
				</el-form-item> -->
				<!-- <el-form-item>
					<el-button type="primary" v-on:click="getid">设备IP</el-button>
				</el-form-item> -->
				<el-form-item>
					<el-button type="primary" @click="handleAdd">有线网络配置</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="cardAdd">wifi设置</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="cardUpdate">大屏幕设置</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="settime">修改密码</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="setlogo">修改logo</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="setserial">获取设备序列号</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="seecallbackf">识别回调</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="registerback">照片注册回调</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="heartback">照设备心跳回调</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		 <transition name="el-fade-in-linear">
				<el-dialog :visible.sync="dialogLogin"  width="480px" :modal="true" :modal-append-to-body="false" :lock-scroll="false" :show-close="false">
							<div class="registercontain" v-show="registerShow">
									<label class="label" for="deviceIp">设备IP:
										<el-input v-model="deviceIp" name="deviceIp"></el-input>
									</label>
									<br>
									<label class="label" for="subnetMask">子网掩码:
										<el-input v-model="subnetMask" name="subnetMask"></el-input>
									</label>
									<br>
									<label class="label" for="gateWay">网关:
										<el-input v-model="gateWay" name="gateWay"></el-input>
									</label>
									<br>
									<label class="label" for="DNS">DNS:
										<el-input v-model="DNS" name="DNS"></el-input>
									</label>
									<br>
									<br>
									<label class="label" for="DHCP">DHCP:
										<el-select v-model="DHCP.value" placeholder="请选择" name="DHCP" >
											<el-option
											v-for="item in DHCP"
											:key="item.value"
											:label="item.label"
											:value="item.value">
											</el-option>
										</el-select>
									</label>
									<br>
									<br>
								<el-button class="register" @click.prevent="Loginbtn" type="primary">连接</el-button>
					</div>
				</el-dialog> 
		</transition>

		<transition name="el-fade-in-linear">
				<el-dialog :visible.sync="dialogcard"  width="480px" :modal="true" :modal-append-to-body="false" :lock-scroll="false" :show-close="false">
					<div class="registercontain" v-show="cardShow">
						<div class="contain">
							<label class="label" for="ssId">Wi-fi名称:
							<el-input v-model="ssId" name="ssId" ></el-input>
							</label>
							<br>
							<label class="label" for="pwd">密码:
								<el-input v-model="pwd" name="pwd" ></el-input>
							</label>
							<br>
							<br>
							<label class="label" for="isDHCPMod">是否设置为动态IP:
								<el-select v-model="DHCPMod" placeholder="请选择" name="isDHCPMod">
									<el-option
									v-for="item in isDHCPMod"
									:key="item.value"
									:label="item.label"
									:value="item.value">
									</el-option>
								</el-select>
							</label>
							<br>
							<div v-show="isDHCP">
								<label class="label" for="ip">IP地址:
									<el-input v-model="ip" name="ip" ></el-input>
								</label>
								<br>
								<label class="label" for="gateway">网关:
									<el-input v-model="gateway" name="gateway" ></el-input>
								</label>
								<br>
								<label class="label" for="dns">DNS服务器:
									<el-input v-model="dns" name="dns" ></el-input>
								</label>
							</div>
							<br>
							<el-button type="primary" plain @click="wifi">确定修改</el-button>
						</div>
					</div>
				</el-dialog> 
		</transition>

		<transition name="el-fade-in-linear">
				<el-dialog :visible.sync="dialogUpdate"  width="480px" :modal="true" :modal-append-to-body="false" :lock-scroll="false" :show-close="false">
					<div class="registercontain" v-show="updateShow">
							<el-form label-width="90px">
								<label class="label" for="isscreenMode">大屏幕模式接口:
									<el-select v-model="screenMode" placeholder="请选择" name="isscreenMode">
										<el-option
										v-for="item in isscreenMode"
										:key="item.value"
										:label="item.label"
										:value="item.value">
										</el-option>
									</el-select>
								</label>
									<br>
									<br>
									<el-button class="register" @click.prevent="updatebtn" type="primary">大屏幕设置</el-button>
							</el-form> 
					</div>
					<div v-show="isDHCP">
						<p>大屏幕背景图片配置</p>
						<br>
						<!-- <input type="file" ref="file_el" @change="choise_file">
						<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
						<br>
						<br>
						<div><img :src="imageUrl"></div> -->
						<el-upload
						class="upload-demo"
						action=''
						:on-change="choise_file"
						list-type="picture">
						<el-button size="small" type="primary">选择图片</el-button>
						<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
						</el-upload>
						<br>
						<el-button type="primary" plain @click="submitUpload">确定修改</el-button>
					</div>
				</el-dialog> 
		</transition>

		<transition name="el-fade-in-linear">
				<el-dialog :visible.sync="dialogtime"  width="480px" :modal="true" :modal-append-to-body="false" :lock-scroll="false" :show-close="false">
						<div class="registercontain" v-show="timeShow">
						<label class="label" for="oldPassage">旧密码:
						<el-input v-model="oldPassage" name="oldPassage" ></el-input>
						</label>
						<br>
						<label class="label" for="newPassage">新密码:
							<el-input v-model="newPassage" name="newPassage" ></el-input>
						</label>
						<br>
						<br>
						<el-button type="primary" plain @click="setpass">确定修改</el-button>
						<br>	
					</div>
				</el-dialog> 
		</transition>

			<transition name="el-fade-in-linear">
				<el-dialog :visible.sync="dialoglogo"  width="480px" :modal="true" :modal-append-to-body="false" :lock-scroll="false" :show-close="false">
						<div class="registercontain" v-show="logoShow">
							<el-upload
							class="upload-demo"
							action=''
							:on-preview="handlePreview"
							:on-remove="handleRemove"
							:on-change="logo_file">
							<el-button size="small" type="primary">选择图片</el-button>
							<img :src="'data:image/png;base64,'+imagelogoUrl" alt="">
							</el-upload>
							<br>
							<el-button type="primary" plain @click="logoUpload">确定修改</el-button>	
					</div>
				</el-dialog> 
		</transition>

		<transition name="el-fade-in-linear">
				<el-dialog :visible.sync="dialogserial"  width="480px" :modal="true" :modal-append-to-body="false" :lock-scroll="false" :show-close="false">
						<div class="registercontain" v-show="serialShow">
							<h2>你的设备号是:{{this.serialNumber}}</h2>
							<br>
					</div>
				</el-dialog> 
		</transition>

		<transition name="el-fade-in-linear">
				<el-dialog :visible.sync="dialogseecallback"  width="480px" :modal="true" :modal-append-to-body="false" :lock-scroll="false" :show-close="false">
						<div class="registercontain" v-show="seecallbackShow">
						<label class="label" for="piccallback">请输入识别回调地址:
						<br>
						<el-input v-model="seecallback" name="seecallback" ></el-input>
						</label>
						<br>
						<br>
						<el-button type="primary" plain @click="setsee">确定</el-button>
						<br>	
					</div>
				</el-dialog> 
		</transition>

		<transition name="el-fade-in-linear">
				<el-dialog :visible.sync="dialogpiccallback"  width="480px" :modal="true" :modal-append-to-body="false" :lock-scroll="false" :show-close="false">
						<div class="registercontain" v-show="piccallbackShow">
						<label class="label" for="piccallback">请输入照片注册回调地址:
						<br>
						<el-input v-model="piccallback" name="piccallback" ></el-input>
						</label>
						<br>
						<br>
						<el-button type="primary" plain @click="setpic">确定</el-button>
						<br>	
					</div>
				</el-dialog> 
		</transition>

		<transition name="el-fade-in-linear">
				<el-dialog :visible.sync="dialogdevicecallback"  width="480px" :modal="true" :modal-append-to-body="false" :lock-scroll="false" :show-close="false">
						<div class="registercontain" v-show="devicecallbackShow">
						<label class="label" for="devicecallback">请输入设备心跳回调地址:
						<br>
						<el-input v-model="devicecallback" name="devicecallback" ></el-input>
						</label>
						<br>
						<br>
						<el-button type="primary" plain @click="setheart">确定</el-button>
						<br>	
					</div>
				</el-dialog> 
		</transition>


		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" label="序号" width="60">
			</el-table-column>
			<el-table-column prop="id" label="序列号" width="100" sortable>
			</el-table-column>
			<el-table-column prop="name" label="设备名称" width="160" sortable>
			</el-table-column>
			<!-- <el-table-column prop="idcardNum" label="卡号" width="160" sortable>
			</el-table-column>
			<el-table-column prop="createTime" label="注册时间" width="200" :formatter="formatDate" sortable>
			</el-table-column> -->
			<el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<!-- <el-col :span="24" class="toolbar" style="padding-bottom: 0px;padding-top:16px;">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col> -->

	</section>
</template>

<script>
var qs = require('qs');
var moment = require('moment');
	export default {
		data() {
			return {
				dialogdevicecallback:false,
				dialogseecallback:false,
				dialogpiccallback:false,
				piccallbackShow:'',
				devicecallbackShow:'',
				seecallbackShow:'',
				seecallback:'',
				piccallback:'',
				devicecallback:'',
				imagelogoUrl:'',
				oldPassage: '',
				newPassage: '',
				screenMode:'',
				serialNumber:'',
				isscreenMode: [{
				value: 'false',
				label: 'false'
				}, {
					value: 'true',
					label: 'true'
				}],
				filters: {
					name: ''
				},
				deviceIp: '',
				gateWay:'',
				subnetMask:'',
				DNS:'',
				DHCP: [{
					value: '选项1',
					label: 'DHCP模式'
				}, {
					value: '选项2',
					label: '手动配置模式'
				}],
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
				dialoglogo:false,
				logoShow:'',
				dialogserial:false,
				serialShow:'',
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
					id: '',
				},
				personId: '',
				dns:'',
				gateway:'',
				ip:'',
				pwd:'',
				ssId:'',
				isDHCP:false,
				DHCPMod:'',
				isDHCPMod: [{
				value: 'false',
				label: 'false'
				}, {
					value: 'true',
					label: 'true'
				}],
			}
		},
		watch:{
			DHCPMod:function(){
				if(this.DHCPMod!=='true'){
					this.isDHCP=true
				}else{
					this.isDHCP=false
				}
			} 
		},
		methods: {
			setsee(){
				this.axios.post('/setIdentifyCallBack',
				qs.stringify({
					callbackUrl:this.seecallback,
					pass:'create1'
				}),		
				{
					headers: {'Content-Type':'application/x-www-form-urlencoded'},
				})
				.then(response => {
					console.log(response.data.data)
				})
				.catch(function (error) {
					console.log(error);
				});
			},
			setpic(){
				this.axios.post('/setImgRegCallBack',
				qs.stringify({
					callbackUrl:this.piccallback,
					pass:'create1'
				}),		
				{
					headers: {'Content-Type':'application/x-www-form-urlencoded'},
				})
				.then(response => {
					console.log(response.data.data)
				})
				.catch(function (error) {
					console.log(error);
				});
			},	
			setpic(){
				this.axios.post('/setImgRegCallBack',
				qs.stringify({
					callbackUrl:this.piccallback,
					pass:'create1'
				}),		
				{
					headers: {'Content-Type':'application/x-www-form-urlencoded'},
				})
				.then(response => {
					console.log(response.data.data)
				})
				.catch(function (error) {
					console.log(error);
				});
			},	
			setheart(){
				this.axios.post('/setIdentifyCallBack',
				qs.stringify({
					callbackUrl:this.devicecallback,
					pass:'create1'
				}),		
				{
					headers: {'Content-Type':'application/x-www-form-urlencoded'},
				})
				.then(response => {
					console.log(response.data.data)
				})
				.catch(function (error) {
					console.log(error);
				});
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			logo_file (file) {
				let reader = new FileReader()
				reader.onload = () => {
					let _base64 = reader.result
					this.imagelogoUrl = _base64.split(",")[1];
				}
				reader.readAsDataURL(file.raw)  
			},
			logoUpload() {
				this.axios.post('/changeLogo',
				qs.stringify({
					imgBase64:this.imagelogoUrl,
					pass:'create1'
				}),		
				{
					headers: {'Content-Type':'application/x-www-form-urlencoded'},
				})
				.then(response => {
					console.log(response.data.data)
				})
				.catch(function (error) {
					console.log(error);
				});
			},
			setpass(){
				this.axios.post('/setPassWord',
				qs.stringify({
					oldPass:this.oldPassage,
					newPass:this.newPassage,
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
			wifi(){
				if(this.DHCPMod!=='true'){
				this.axios.post('/setWifi',
				qs.stringify({
					pass:'create1',
					ssId:this.ssId,
					pwd:this.pwd,
					isDHCPMod:this.isDHCPMod.value
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
					}else{
						this.axios.post('/setWifi',{
						pass:'create1',
						ssId:this.ssId,
						pwd:this.pwd,
						isDHCPMod:this.isDHCPMod.value,
						ip:this.ip,
						gateway:this.gateway,
						dns:this.dns
					},
					{
						headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
						'Access-Control-Allow-Headers':'*'},
					})
					.then(response => {
					})
					.catch(function (error) {
						console.log(error);
					});
				}
			},
			submitUpload() {
				this.axios.post('/setActScreenImg',
				qs.stringify({
					imgBase64:this.imageUrl,
					pass:'create1'
				}),		
				{
					headers: {'Content-Type':'application/x-www-form-urlencoded'},
				})
				.then(response => {
					console.log(response.data.data)
				})
				.catch(function (error) {
					console.log(error);
				});
			},
			choise_file () {
				this.imageUrl01 = ''
				this.userpic = false
				this.localpic = true
				// this.indexdemoid=19
				// this.urllarge='static/publish/'+this.indexdemoid+'l.png'
				var file_info = this.$refs.file_el.files[0]
				// 使用FileReader对象预览
				var fr = new FileReader()
				// 通过fr.readAsDataURL文件的内容进行读取
				fr.readAsDataURL(file_info)
				var that = this
				fr.onload = function () {
						// DataUrl data? :data:image/jpeg;base64,/9j/4
						that.imageUrl = this.result
				}   
			},
			formatDate:function(row, column) {
				var date = row[column.property];
			          if (date == undefined) {
			             return "";
			          }
           		return moment(date).format("YYYY-MM-DD HH:mm:ss");
			},
			Loginbtn(){
				this.axios.post('/setNetInfo',
				qs.stringify({
					isDCCPMod:this.DHCP.value,
					ip:this.deviceIp,
					gateway:this.getaWay,
					subnetMask:this.subnetMask,
					DNS:this.DNS,
					pass:'create1'
				}),		
				{
					headers: {'Content-Type':'application/x-www-form-urlencoded'},
				})
							.then(response => {
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
				})
				.catch(function (error) {
					console.log(error);
				});
			},
			updatebtn(){
				if(this.screenMode!=='true'){
					this.axios.post('/setScreenMode',
					qs.stringify({
						pass:'create1',
						screenMode:2,
					}),
					{
						headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
						'Access-Control-Allow-Headers':'*'},
					})
					.then(response => {
						this.isDHCP=false
					})
					.catch(function (error) {
							console.log(error);
					});
				}else{
					this.axios.post('/setScreenMode',
					qs.stringify({
						pass:'create1',
						screenMode:1,
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
				}
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
				// this.axios.post('/person/findByPage',
				// qs.stringify({
				// 	pass:'create1',
				// 	personId:-1
				// }),
				// {
				// 	headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
				// 	'Access-Control-Allow-Headers':'*'},
				// })
				// .then(response => {
				// 	// console.log(response)
				// 	this.listLoading = false;
				// 	console.log(response.data.data.personInfos)
				// 	this.users=response.data.data.personInfos
				// })
				// .catch(function (error) {
				// 	this.$confirm('没有查询到相关的数据?', '提示', {
				// 		type: 'warning'
				// 	})
				// });
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
			setlogo: function () {
				this.dialoglogo = true;
				this.logoShow = true;
			},
			seecallbackf:function(){
				this.dialogseecallback = true;
				this.seecallbackShow = true;
			},
			registerback:function(){
				this.dialogpiccallback = true;
				this.piccallbackShow = true;
			},
			heartback:function(){
				this.dialogdevicecallback = true;
				this.devicecallbackShow = true;
			},
			setserial: function () {
				this.dialogserial = true;
				this.serialShow = true;
				this.axios.post('/getDeviceKey',
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

</style>