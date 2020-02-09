import React from 'react';
import { Component } from 'react'
import { Input,Icon,Row,Col,Pagination,Button,Modal,Form,Select,Switch,Radio  } from 'antd'
import { getGoodsList,getGoodsTypeList,getGoodsBrandList,getGoodsModelList,insertGoods,getGoodsDetail,deleteGoods } from '@/api/goods/goods'
import Toast from '@/components/toast'
const { Search } = Input;
const { Option } = Select;
const { confirm } = Modal;
import '@/style/goodslist.less'
class GoodsList extends Component{
    constructor(props){
        super(props);
        this.state = {
            pageConfig:{
                now_page:0,
                page_size:10,
                total_page:0
            },
            key_word:'',
            goodsInfo:[],
            goods_flag:false,
            brand_list:[
            ],
            type_list:[],
            model_list:[],
            goods_detail_id:''
        };

        this._getGoodsList();
    }
    searchHandle(value){
        const that = this;
        let state = that.state;
        state.key_word =value;
        that.setState(state);
        that._getGoodsList();
    }
    _getGoodsTypeList(){
        const that = this;
        let state = that.state;
        getGoodsTypeList().then(response=>{
            if(response.data.code == 200){
                state.type_list = response.data.data
            }else{
                state.type_list = [];
            }
            that.setState(state)
        })
    }
    _getGoodsList(){
        const that = this;
        let state = that.state;
        let params ={
            page:state.pageConfig.now_page,
            page_size:state.pageConfig.page_size,
            key_word:state.key_word
        }
        getGoodsList(params).then(response=>{
            if(response.data.code == 200){
                let data = response.data.data;
                state.goodsInfo = data.goods_list;
                state.pageConfig.total_page = data.total;
                that.setState(state)
            }
        })
    }
    setGoodsList(){
        let { goodsInfo } = this.state;

        if(goodsInfo.length>0){
            return goodsInfo.map((value,index)=>{
                return(
                    <Row className="tr" key={index}>
                        <Col span={6} className="td">{ value.goods_name }</Col>
                        <Col span={5} className="td">{ value.spec }</Col>
                        <Col span={2} className="td">{ value.price }</Col>
                        <Col span={2} className="td">{ value.stock }</Col>
                        <Col span={3} className="td">{ value.sales_volume }</Col>
                        <Col span={3} className="td">{ value.create_time }</Col>
                        <Col span={3} className="td oper">
                            <a onClick={ ()=>this.getDetail(value.id) }>编辑</a>
                            <a style={{ marginLeft:'10px' }} onClick={ ()=>this._deleteGoods(value.id) }>删除</a>
                        </Col>
                    </Row>
                )
            })
        }else{
            return(
                <Row>
                    <Col className="td" style={{ textAlign:'center' }}>暂无数据</Col>
                </Row>
            )
        }

    }

    changePage(value){
        const that = this;
        let state = that.state;
        state.pageConfig.now_page =Number(value)-1;
        that.setState(state);
        that._getGoodsList();
    }
    addGoodsHandle(){
        const that = this;
        let nowState = this.state;
        that.props.form.setFieldsValue({
            goods_name:"",
            spec:"",
            price:"",
            buy_price:"",
            type_id:"",
            brand_id:"",
            model_id:"",
            stock:"",
            sales_volume:"",
            address:"",
            is_disable:1
        })
        that._getGoodsTypeList();
        nowState.goods_flag = true;
        nowState.goods_detail_id = "";
        nowState.brand_list = [];
        nowState.model_list = [];
        that.setState(nowState);
    }
    handleCancel(){
        const that = this;
        let nowState = this.state;
        nowState.goods_flag = false;
        this.setState(nowState)
    }
    handleSubmit(event){
        const that = this;
        let state = that.state;
        event.preventDefault();
        that.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            let params = values;
            if(state.goods_detail_id !=''){
                params.id = state.goods_detail_id;
            }
            insertGoods(params).then(response=>{
                if(response.data.code == 200){
                    state.goods_flag = false;
                    that.setState(state);
                    that._getGoodsList();
                }else{
                    Toast.error('账号不存在或账号面错误')
                }
            })
            
          }
        });
    }
    changeType(value){
        const that = this;
        let state = that.state;
        let params = {
            type_id:value
        }
        getGoodsBrandList(params).then(response=>{
            if(response.data.code == 200){
                state.brand_list = response.data.data
            }else{
                state.brand_list = [];
            }
            that.setState(state)
        })
    }
    changeBrand(value){
        const that = this;
        let state = that.state;
        let params = {
            brand_id:value
        }

        getGoodsModelList(params).then(response=>{
            if(response.data.code == 200){
                state.model_list = response.data.data
            }else{
                state.model_list = [];
            }
            that.setState(state)
        })
    }
    getDetail(id){
        const that = this;
        let state = that.state;
        let params ={
            id:id
        }
        getGoodsDetail(params).then(response=>{
            if(response.data.code == 200){
                let data = response.data.data;
                that.props.form.setFieldsValue({
                    goods_name:data.goods_name?data.goods_name:"",
                    spec:data.spec?data.spec:"",
                    price:data.price?Number(data.price):0,
                    buy_price:data.buy_price?Number(data.buy_price):0,
                    type_id:data.type_id?Number(data.type_id):"",
                    brand_id:data.brand_id?Number(data.brand_id):"",
                    model_id:data.model_id?Number(data.model_id):"",
                    stock:data.stock?Number(data.stock):0,
                    sales_volume:data.sales_volume?Number(data.sales_volume):0,
                    address:data.address?data.address:"",
                    is_disable:data.is_disable
                })
                state.goods_detail_id = data.id;
                state.goods_flag = true;
                that._getGoodsTypeList();
                that.changeBrand(data.type_id);
                that.changeBrand(data.brand_id);
                that.setState(state);
            }else{
                Toast.error('记录不存在')
            }
        })
    }
    _deleteGoods(id){
        const that = this;
        confirm({
            title: '删除商品',
            content: '您确认要删除改商品吗',
            onOk() {
                let state = that.state;
                let params ={
                    id:id
                }
                deleteGoods(params).then(response=>{
                    if(response.data.code == 200){
                        that._getGoodsList();
                    }else{
                        Toast.error('删除失败')
                    }
                })
            },
            onCancel() {},
          });

    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const { brand_list,type_list,model_list } = this.state;
        return (
            <div id="goodsList">
                <div className="search">
                    <div className="ipt">
                        <span style={{ marginRight:'10px' }}>搜索：</span>
                        <Search placeholder="请输入商品名" onSearch={value => this.searchHandle(value) } style={{ width: 200 }}/>
                    </div>   
                    <Button type="primary" onClick={ ()=>this.addGoodsHandle() }>新增</Button>
                </div>
                <div className="table">
                    <Row className="th">
                        <Col span={6} className="td">商品名</Col>
                        <Col span={5} className="td">规格</Col>
                        <Col span={2} className="td">价格(￥)</Col>
                        <Col span={2} className="td">库存</Col>
                        <Col span={3} className="td">销量(月)</Col>
                        <Col span={3} className="td">商品添加时间</Col>
                        <Col span={3} className="td">操作</Col>
                    </Row>
                    { this.setGoodsList() }
                </div>
                <div style={{ width:'100%',display:'flex',justifyContent:'flex-end',marginTop:"30px"}}>
                    <Pagination showQuickJumper current={ this.state.pageConfig.page } pageSize={ this.state.pageConfig.page_size} total={ this.state.pageConfig.total_page } onChange={ (value)=>this.changePage(value) } />
                </div>
                <Modal
                    title="新增商品"
                    footer=""
                    visible={this.state.goods_flag}
                    onCancel={ ()=>this.handleCancel() }
                    width = { 800 }
                >
                    <div className="goods-form">
                        <Form  onSubmit={ e =>this.handleSubmit(e) } labelCol={ { span: 6 } } wrapperCol={ {span:14} } labelAlign={ 'right'}>
                            <Row>
                                <Col span={ 12 }>
                                    <Form.Item label="商品名称" >
                                        {getFieldDecorator('goods_name', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请输入商品名称',
                                                },
                                            ],
                                        })(<Input />)}
                                    </Form.Item>
                                </Col>
                                <Col span={ 12 }>
                                    <Form.Item label="商品规格">
                                        {getFieldDecorator('spec', {
                                            rules: [
                                            ],
                                        })(<Input />)} 
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={ 12 }>
                                    <Form.Item label="价格" >
                                        {getFieldDecorator('price', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请输入价格',
                                                },
                                                {
                                                    pattern: new RegExp(/^[0-9\.]{1,}$/, "g") , 
                                                    message: '请输入正确的价格'   
                                                },
                                            ],
                                        })(<Input />)}
                                    </Form.Item>
                                </Col>
                                <Col span={ 12 }>
                                    <Form.Item label="进货价">
                                        {getFieldDecorator('buy_price', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请输入进货价',   
                                                },
                                                {
                                                    pattern: new RegExp(/^[0-9\.]{1,}$/, "g") ,   
                                                    message: '请输入正确的进货价'  
                                                },
                                            ],
                                        })(<Input />)}
                                    </Form.Item>
                                </Col>   
                            </Row>
                            <Row>
                                <Col span={ 12 }>
                                    <Form.Item label="类型">
                                        {getFieldDecorator('type_id', {  
                                            rules: [{ required: true, message: '请选择类型' }],  
                                        })(
                                            <Select placeholder="请选择类型" onChange={ value =>this.changeType(value) }>
                                                {
                                                    type_list.map((value,index)=>{   
                                                        return(   
                                                            <Option value={value.id} key={index}>{ value.type_name}</Option>  
                                                        )  
                                                    })
                                                }
                                                
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={ 12 }>
                                    <Form.Item label="品牌">
                                        {getFieldDecorator('brand_id', {
                                            rules: [{ required: true, message: '请选择品牌' }],
                                        })(
                                            <Select placeholder="请选择品牌" onChange={ value=>this.changeBrand(value) }>
                                                {
                                                    brand_list.map((value,index)=>{
                                                        return(
                                                            <Option value={value.id} key={index}>{ value.brand_name}</Option>
                                                        )
                                                    })
                                                }
                                                
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>   
                            </Row>
                            <Row>
                                <Col span={ 12 }>
                                    <Form.Item label="型号">
                                        {getFieldDecorator('model_id', {
                                            rules: [{ required: true, message: '请选择型号' }],
                                        })(
                                            <Select placeholder="请选择型号" >
                                                {
                                                    model_list.map((value,index)=>{
                                                        return(
                                                            <Option value={value.id} key={index}>{ value.model_name}</Option>
                                                        )
                                                    })
                                                }
                                                
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={ 12 }>
                                    <Form.Item label="库存" >
                                        {getFieldDecorator('stock', {
                                            rules: [

                                                {
                                                    pattern: new RegExp(/^[0-9]{1,}$/, "g") , 
                                                    message: '请输入正确的库存数量'
                                                },
                                            ],
                                        })(<Input />)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={ 12 }>
                                    <Form.Item label="销量" >
                                        {getFieldDecorator('sales_volume', {
                                            rules: [

                                                {
                                                    pattern: new RegExp(/^[0-9]{1,}$/, "g") , 
                                                    message: '请输入正确的月销量'
                                                },
                                            ],
                                        })(<Input />)}
                                    </Form.Item>
                                </Col>
                                <Col span={ 12 }>
                                    <Form.Item label="产地" >
                                        {getFieldDecorator('address', {
                                            rules: [

                                            ],
                                        })(<Input />)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={ 12 }>
                                    <Form.Item label="是否显示" >
                                        {getFieldDecorator('is_disable', {
                                            initialValue:1,
                                            rules: [
                                            
                                            ],
                                        })(<Radio.Group >
                                            <Radio value={0}>不显示</Radio>
                                            <Radio value={1}>显示</Radio>
                                          </Radio.Group>)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Form.Item wrapperCol={ {span:24} }>
                                    <div className="btn">
                                        <Button type="primary" htmlType="submit" style={ {width:'80px'} }>
                                            提交
                                        </Button>
                                    </div>
                                </Form.Item>
                            </Row>
                        </Form>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Form.create({ name: 'goods' })(GoodsList);
