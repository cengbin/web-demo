<template>
  <div class="appb">
    <div class="sn-report ">
      <section class="ayout-pad-full layout-pad-top-nil back-white " style="padding: 16px;">
        <div class="ppt-list">
          <section class="ppt-item">
            <h3>声纳报告：</h3>
            <input class="title" type="text" value="用户对水果品类的喜好调研" placeholder="请输入标题"/>
            <!--<input class="title" type="text" value=""/>-->
            <div class="author">多点声呐·调研人：<input class="edit" type="text" value="admin" placeholder="请输入"/></div>
          </section>
          <section class="ppt-item">
                <textarea class="edit" name="" id="a" cols="30"
                          rows="10" placeholder="请输入报告说明">请在此处填写报告说明，可为空。例如：通过调研用户对水果品类的洗好，指导水果品类的采 购以及品类陈列。</textarea>
          </section>
          <section class="ppt-item">
            <h2>目录</h2>
            <ul>
              <li><span>一、样本概况</span></li>
              <li>
                <span>二、调研结果</span>
                <ul>
                  <li><span>1、 您一周买几次水果？</span></li>
                  <li><span>2、您是怎么形容桃子的呢？</span></li>
                  <li><span>3、您在多点购买的水果新鲜度打分</span></li>
                  <li><span>4、以下说过多少钱你会购买呢？</span></li>
                  <li><span>5、以下水果您在多点购买的是否新鲜？</span></li>
                  <li><span>6、您所在的地区？</span></li>
                </ul>
              </li>
            </ul>
          </section>
          <section class="ppt-item">
            <h2>一、样本概况</h2>
          </section>
          <section class="ppt-item">
            <div class="l1">调研时间：2020/05/28—2020/07/12，共计44天</div>
            <div class="l2">回收情况：共100份样本，发放1000份，回收率10.00%</div>
            <div class="l3">
              <div style="flex:0 0 60px;">样本规则：</div>
              <div style="flex:1 0 auto;">
                <textarea name="" id="b" cols="50" rows="10" placeholder="请输入样本规则">【订单维度】系统以用户维度选取业态为O2O，商家为华东物美，特定商 sku，支付完成的订单</textarea>
              </div>
            </div>
          </section>
          <section class="ppt-item">
            <h2>二、调研结果</h2>
            <button>编辑</button>
          </section>
          <section class="ppt-item issue">
            <div class="content">
              <h4 class="title">1. 您一周买几次水果？（单选题示例）</h4>
              <input class="desc" value="此处填写题目解答，可为空，例如：75%的用户每周买 1 -3次水果，水果目前为常购品类"/>
              <button class="close">x</button>
            </div>
          </section>
          <section class="ppt-item issue">
            <div class="content">
              <h4 class="title">2. 您怎么形容桃子？</h4>
              <input class="desc" value="此处填写题目解答，可为空"/>
              <button class="close">x</button>
            </div>
            <div class="mask">
              <button class="revocation" style="top:100px;">r</button>
            </div>
          </section>
          <section class="ppt-item">
            <h2>THANK YOU</h2>
          </section>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app-b'
  }
</script>

<style src="./report.styl" lang="stylus"></style>
