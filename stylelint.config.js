module.exports = {
  extends: "stylelint-config-standard",
  rules: {
    "rule-empty-line-before": [
      "always",
      {
        ignore: ["inside-block"],
        except: ["after-single-line-comment"]
      }
    ],
    "selector-class-pattern": "^[a-z][a-zA-Z0-9]+$",  // camelCase
  }
}
