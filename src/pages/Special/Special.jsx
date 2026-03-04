import Layout from '@/components/NavBar/Layout'
import React from 'react'
import styles from "./Special.module.css"

const Special = () => {
  return (
    <Layout>
        <div className={styles.special_page}>
            <div className={styles.special_block}>
                <h1>Fazliddin and Shabnam - 100% 👫</h1>
                <h3>Shabnam Fazliddin Habibulayev uchun juda muxum inson, Shakhzod va Muslim do'stlaridan muhim bob ketishiyam mumkun(yo uje muhumi?). Mayli baxtli bob ketsa boldi♥. Shabnamam juda bemor ekan, xuy e kanakib jidavoti uni, sabr sanga man 11 yil chidavoman.</h3>
            </div>
            <div className={styles.special_block}>
                <h1>Shakhzod and Hulkar - 50% or less (voobshe xuy ego znaet🙃)</h1>
                <h3>Endi manda xali nihuya chunarlimas, huki bilan oxshidimi yomi, eng muhim shu proekt oxshasa boldi🗿</h3>
            </div>
            <div className={styles.special_block}>
                <h1>Muslimjan - He is too beautiful for everyone♥💋</h1>
                <h3>SOON...</h3>
            </div>
            <p>Sikilib ketdim o'zbe tilida yozurib, shu 1 eban uchun yozdim mani oris divuradigan eban uchun, shu 2 ebandan yaqinro odam yo, this page for you💖</p>
        </div>
    </Layout>
  )
}

export default Special