module.exports = {
  plugins: ["stylelint-order"],
  extends: ["stylelint-config-standard", "stylelint-config-prettier"],
  customSyntax: "postcss-html",
  rules: {
    "no-empty-source": null,
    "order/properties-order": require('fs-css-order').propertiesOrder,
    "selector-class-pattern": null,
    "no-descending-specificity": null,
    "unit-no-unknown": [true, { "ignoreUnits": ["rpx"] }],
    "order/order": [
      [
        "dollar-variables",
        "custom-properties",
        "at-rules",
        "declarations",
        {
          "type": "at-rule",
          "name": "supports"
        },
        {
          "type": "at-rule",
          "name": "media"
        },
        "rules"
      ],
      { "severity": "warning" }
    ]
  },
  ignoreFiles: ["**/*.js", "**/*.jsx", "**/*.tsx", "**/*.ts"],
  overrides: [
    {
      "files": ["*.vue", "**/*.vue", "*.html", "**/*.html"],
      "extends": ["stylelint-config-recommended", "stylelint-config-html"],
      "rules": {
        "keyframes-name-pattern": null,
        "selector-pseudo-class-no-unknown": [
          true,
          {
            "ignorePseudoClasses": ["deep", "global"]
          }
        ],
        "selector-pseudo-element-no-unknown": [
          true,
          {
            "ignorePseudoElements": ["v-deep", "v-global", "v-slotted"]
          }
        ]
      }
    },
    {
      "files": ["*.less", "**/*.less"],
      "customSyntax": "postcss-less",
      "extends": ["stylelint-config-standard", "stylelint-config-recommended-vue"]
    }
  ]
}