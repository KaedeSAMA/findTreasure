<template>
    <view>
        <u-checkbox-group
            v-model="checkboxValue1"
            placement="column"
            @change="checkboxChange"
        >
            <u-checkbox
                :customStyle="{marginBottom: '8px'}"
                v-for="(item, index) in checkboxList1"
                :key="index"
                :label="item.name"
                :name="item.name"
            >
            </u-checkbox>
        </u-checkbox-group>
    </view>
</template>
<script>
export default {
    data() {
        return {
            checkboxValue1:[],
            // 基本案列数据
            checkboxList1: [{
                    name: '苹果',
                    disabled: false
                },
                {
                    name: '香蕉',
                    disabled: false
                },
                {
                    name: '橙子',
                    disabled: false
                }
            ],
        }

    },
    methods: {
        checkboxChange(n) {
            console.log('change', n);
        }
    }
}
</script>