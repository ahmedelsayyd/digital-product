const path = require('path');
const glob = require('glob')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');

const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const PurgeCSSPlugin = require('purgecss-webpack-plugin')


const PATHS = {
    src: path.join(__dirname, 'src')
}

module.exports = {
    mode: "production",

    entry: {
        main: './src/index.js',
        vendor: './src/vendor.js'
    },

    output: {
        filename: "[name].[contenthash].bundle.js",
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: 'assets/[hash][ext][query]',
        clean: true
    },

    devtool: 'inline-source-map',

    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
            serveIndex: true,
        },
        hot: true,

    },

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader, 
                    "css-loader",
                ],
            },

            {
                test: /\.html$/i,
                loader: "html-loader",
            },
          

          {
            test: /\.(eot|ttf|svg|woff|woff2)$/,
            type: 'asset/resource',
            generator: {
                filename: 'webfonts/[hash][ext][query]'
            }
          },

          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },

        ],
    },


    plugins: [
        new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
        new PurgeCSSPlugin({
            paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
        }),

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],


    optimization: {
        minimizer:[
            new CssMinimizerPlugin(),
            new TerserPlugin(),
            new HtmlWebpackPlugin({
                template: "./src/template.html",
                minify: {
                  removeAttributeQuotes: true,
                  collapseWhitespace: true,
                  removeComments: true
                }
            }),



            // OPTIMIZE IMAGES
            new ImageMinimizerPlugin({
                minimizer: {
                  implementation: ImageMinimizerPlugin.imageminGenerate,
                  options: {
                    // Lossless optimization with custom option
                    // Feel free to experiment with options for better result for you
                    plugins: [
                      ["gifsicle", { interlaced: true }],
                      ["mozjpeg", { progressive: true, quality: 50 }],
                      ["pngquant", { optimizationLevel: 3 , speed: 10, quality:[.9, .95], strip: true}],
                      // Svgo configuration here https://github.com/svg/svgo#configuration
                      [
                        "svgo",
                        {
                            plugins: [
                            
                                'preset-default',
                                'prefixIds',

                                // {
                                //     name: "removeViewBox",
                                //     active: false,
                                // },

                                // {
                                //     name: "addAttributesToSVGElement",
                                //     params: {
                                //         attributes: [{ xmlns: "http://www.w3.org/2000/svg" }]
                                //     }
                                // }

                            ]
                        },
  
                      ],
                    ],
                  },
                },
            }),
            
        ]
    }
}