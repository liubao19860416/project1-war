package com.saike.grape.utils.v11.interceptor;

public enum ParamLevelTypeEnum {

    isExist("1"), isNull("2"), isEmpty("3");

    private String levelType;

    private ParamLevelTypeEnum(String levelType) {
        this.levelType = levelType;
    }

    @Override
    public String toString() {
        return this.levelType;
    }

    public static void main(String[] args) {
        // ParamLevelTypeEnum[] types = ParamLevelTypeEnum.values();
        // for (ParamLevelTypeEnum type : types) {
        // System.out.println(type.name() + type.ordinal() + type);

        // }
        System.out.println(String.valueOf(ParamLevelTypeEnum.isEmpty));
        System.out.println(ParamLevelTypeEnum.isEmpty);
    }

}
