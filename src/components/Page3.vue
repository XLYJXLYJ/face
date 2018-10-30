<template>
	<div class="components-container">
		<div style="margin-left: 25%;margin-top: 40px;">
			<label class="label" for="slogan">公司名称:
				<input v-model="slogan" name="slogan" >
			</label>
			<label class="label" for="intro">公司口号:
				<input v-model="intro" name="intro" >
			</label>
			<label class="label" for="companyName">设备名称:
				<input v-model="companyName" name="companyName" >
			</label>
			<br>
			<label class="label" for="delayTimeForCloseDoor">继电器控制开门到关门的时间间隔:
				<input v-model="delayTimeForCloseDoor" name="delayTimeForCloseDoor" >
			</label>
			<br>
			<label class="label" for="identifyDistance">识别距离:
				<el-select v-model="identifyDistance.value" placeholder="请选择" name="identifyDistance" >
					<el-option
					v-for="item in identifyDistance"
					:key="item.value"
					:label="item.label"
					:value="item.value">
					</el-option>
				</el-select>
			</label>
			<label class="label" for="identifyScores">识别分数:
				<input v-model="identifyScores" name="identifyScores" >
			</label>
			<label class="label" for="saveIdentifyTime">识别间隔:
				<input v-model="saveIdentifyTime" name="saveIdentifyTime" >
			</label>
				<label class="label" for="multiplayerDetection">识别方式:
				<el-select v-model="multiplayerDetection.value" placeholder="请选择" name="multiplayerDetection" >
					<el-option
					v-for="item in multiplayerDetection"
					:key="item.value"
					:label="item.label"
					:value="item.value">
					</el-option>
				</el-select>
			</label>
			<br>
			<label class="label" for="ttsModType">语音模式:
				<el-select v-model="ttsModType.value" placeholder="请选择" name="ttsModType" >
					<el-option
					v-for="item in ttsModType"
					:key="item.value"
					:label="item.label"
					:value="item.value">
					</el-option>
				</el-select>
			</label>
			<label class="label" for="ttsModContent">语音自定义:
				<input v-model="ttsModContent" name="ttsModContent" >
			</label>
			<br>
			<label class="label" for="displayModType">显示模式:
				<el-select v-model="ttsModType.value" placeholder="请选择" name="displayModType" >
					<el-option
					v-for="item in displayModType"
					:key="item.value"
					:label="item.label"
					:value="item.value">
					</el-option>
				</el-select>
			</label>
			<label class="label" for="displayModContent">显示自定义:
				<input v-model="displayModContent" name="displayModContent" >
			</label>
			<br>
			<label class="label" for="comModType">串口模式:
				<el-select v-model="comModType.value" placeholder="请选择" name="comModType" >
					<el-option
					v-for="item in comModType"
					:key="item.value"
					:label="item.label"
					:value="item.value">
					</el-option>
				</el-select>
			</label>
			<label class="label" for="comModContent">串口自定义:
				<input v-model="comModContent" name="comModContent" >
			</label>
			<br>
			<label class="label" for="recStrangerType">陌生人开关:
				<el-select v-model="recStrangerType.value" placeholder="请选择" name="recStrangerType" >
					<el-option
					v-for="item in recStrangerType"
					:key="item.value"
					:label="item.label"
					:value="item.value">
					</el-option>
				</el-select>
			</label>
			<label class="label" for="ttsModStrangerType">陌生人语音模式:
				<el-select v-model="ttsModStrangerType.value" placeholder="请选择" name="ttsModStrangerType" >
					<el-option
					v-for="item in ttsModStrangerType"
					:key="item.value"
					:label="item.label"
					:value="item.value">
					</el-option>
				</el-select>
			</label>
			<label class="label" for="ttsModStrangerTypeUserDefined">陌生人警报自定义:
				<input v-model="ttsModContent" name="ttsModStrangerContent" >
			</label>
			<br>
			<label class="label" for="recStrangerTimesThreshold">判定时间等级:
				<el-select v-model="recStrangerTimesThreshold.value" placeholder="请选择" name="recStrangerTimesThreshold" >
					<el-option
					v-for="item in recStrangerTimesThreshold"
					:key="item.value"
					:label="item.label"
					:value="item.value">
					</el-option>
				</el-select>
			</label>
			<label class="label" for="recRank">等级识别:
				<el-select v-model="recRank.value" placeholder="请选择" name="recRank">
					<el-option
					v-for="item in recRank"
					:key="item.value"
					:label="item.label"
					:value="item.value">
					</el-option>
				</el-select>
			</label>
			<br>
			<label class="label" for="wg">韦跟输出:
				<el-select v-model="wg.value" placeholder="请选择" name="wg" >
					<el-option
					v-for="item in wg"
					:key="item.value"
					:label="item.label"
					:value="item.value">
					</el-option>
				</el-select>
			</label>
			<el-button type="primary" plain @click="submit">确定修改</el-button>
		</div>
	</div>
</template>

<script>

export default {
  name: 'CountToDemo',
  data() {
    return {
		ttsModContent:'',
		comModContent:'',
		companyName: '',//公司名称
		slogan:'',//标语
		intro:'',
		identifyScores:'',//识别分数
		saveIdentifyTime:'',//识别间隔
		ttsModStrangerTypePortUserDefined:'',//陌生人自定义内容
		delayTimeForCloseDoor:'',
		displayModContent:'',
		identifyDistance: [{//识别距离
			value: '选项1',
			label: '0:无限制'
		}, {
			value: '选项2',
			label: '1:0.5米以内'
		}, {
			value: '选项3',
			label: '2:1米以内'
		},{
			value: '选项4',
			label: '3:1.5米以内'
		}, {
			value: '选项5',
			label: '4:2米以内'
		}, {
			value: '选项6',
			label: '5:3米以内'
		},{
			value: '选项7',
			label: '6:4米以内'
		}],
		automaticRestart:[{
			value: '选项1',
			label: 'false'
		}, {
			value: '选项2',
			label: 'true'
		}],
		multiplayerDetection:[{
			value: '选项1',
			label: '识别多人脸'
		}, {
			value: '选项2',
			label: '识别最大人脸'
		}],
		ttsModType: [{
			value: '选项1',
			label: '1.不需要语音播报'
		}, {
			value: '选项2',
			label: '2.播报名字'
		}, {
			value: '选项3',
			label: '100.自定义'
		}],
		displayModType: [{
			value: '选项1',
			label: '1.显示名字'
		}, {
			value: '选项2',
			label: '100.自定义'
		}],
		comModType: [{
			value: '选项1',
			label: '1.开门'
		}, {
			value: '选项2',
			label: '2.不输出'
		},{
			value: '选项3',
			label: '3.输出人员ID'
		}, {
			value: '选项4',
			label: '4.输出身份证/IC卡'
		}, {
			value: '选项5',
			label: '100.自定义'
		}],
		wg: [{
			value: '选项1',
			label: '输出卡号（WG26)'
		}, {
			value: '选项2',
			label: '输出人员ID（WG26)'
		}, {
			value: '选项3',
			label: '输出卡号（WG34)'
		},{
			value: '选项4',
			label: '输出人员ID（WG34)'
		}],
		recRank: [{
			value: '选项1',
			label: '1:速度最快，精确率最低'
		}, {
			value: '选项2',
			label: '2:速度较快，精确率较高'
		}, {
			value: '选项3',
			label: '2:速度较慢，精确率最高'
		}],
		recStrangerType: [{
			value: '选项1',
			label: '不识别'
		}, {
			value: '选项2',
			label: '识别'
		}],
		recStrangerTimesThreshold: [{
			value: '选项1',
			label: '1'
		}, {
			value: '选项2',
			label: '2'
		}, {
			value: '选项3',
			label: '3'
		}],
		ttsModStrangerType: [{
			value: '选项1',
			label: '1：不需要语音播报'
		}, {
			value: '选项2',
			label: '2：陌生人警报'
		}, {
			value: '选项3',
			label: '100：自定义'
		}],
		value: ''
    }
  },
	computed: {
	},
	mounted() {
		this.getUsers();
		var pass = sessionStorage.getItem('pass');
		if (pass) {
			pass = JSON.parse(pass);
		}else{
			this.$router.push({ path: '/' });
		}
	},
	methods: {
		submit(){
		this.axios.post('/setConfig',{
				companyName:this.companyName,
				identifyDistance:this.identifyDistance.value?this.identifyDistance.value:1,
				identifyScores:this.identifyScores?this.identifyScores:80,
				saveIdentifyTime:this.saveIdentifyTime?this.saveIdentifyTime:0,
				ttsModType:this.ttsModType.value?this.ttsModType.value:100,
				ttsModContent:"欢迎欢迎",
				comModType:this.comModType.value?this.comModType.value:100,
				comModContent:this.comModTypeUserDefined?this.comModTypeUserDefined:"hello",
				displayModType:this.displayModType.value?this.value:100,
				displayModContent:this.displayModContent?this.displayModContent:"{name}欢迎你",
				slogan:this.slogan?this.slogan:"你还没设置公司名称哦",
				intro:this.intro?this.intro:"你还没设置公司口号",
				recStrangerType:this.recStrangerType.value?this.recStrangerType.value:2,
				recStrangerTimesThreshold:this.recStrangerTimesThreshold.value?this.recStrangerTimesThreshold.value:2,
				ttsModStrangerType:this.ttsModStrangerType.value?this.ttsModStrangerType.value:100,
				ttsModStrangerContent:this.ttsModStrangerTypePortUserDefined?this.ttsModStrangerTypePortUserDefined:"陌生人啊你好",
				multiplayerDetection:this.multiplayerDetection?this.multiplayerDetection:1,
				wg:this.wg.value,
				recRank:this.recRank.value?this.recRank.value:2,
				delayTimeForCloseDoor:this.delayTimeForCloseDoor
			},
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
		}
	}
}
</script>

<style scoped>

.label {
  color: #2f4f4f;
  font-size: 16px;
  display: inline-block;
  margin: 15px 30px 15px 0;
}

input {
  position: relative;
  display: inline-block;
  padding: 4px 7px;
  width: 70px;
  height: 28px;
  cursor: text;
  font-size: 12px;
  line-height: 1.5;
  color: rgba(0, 0, 0, .65);
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  -webkit-transition: all .3s;
  transition: all .3s;
}

</style>

