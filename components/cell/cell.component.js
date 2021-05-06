// components/cell/cell.component.js

/**
 * @usage
 *  <view class="width100">
        <cell-component iconImg="/resources/image/home/info_invit.png" title="邀请好友">
            // <slot></slot>
			<image mode="widthFix" style="width: 56px; margin-left: 5px;" src="/resources/image/home/Invitation_icon.png"></image>
		</cell-component>
    </view>
    
    @param iconImg string | null
    @param title   string 
 */

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        iconImg: {
            type: String,
            value: ""
        },
        title: {
            type: String,
            value: ""
        },
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        onTap() {
            this.triggerEvent("click", {});
        }
    }
})
