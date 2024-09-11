import CoralDataSet from "./CoralDataSet";
import MyResponsivePie from "./PieChart";
import GraphThemes from './GraphThemes'


const points = [
    "Benthic Index",
    "Coral Condition Index",
    "Coral Disease Index",
    "Coral Recruitment Index",
    "Large Parrotfish Index",
    "Grouper Index",
    "Bahamian Reef Health Index (BRHI)"
]

function TabContent(props) {
    console.log(CoralDataSet[points[props.selectedTab]].image)
    return (
        <>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <h1 style={{ margin: '0' }}>{points[props.selectedTab]}</h1>
            </div>
            <p>{CoralDataSet[points[props.selectedTab]].description}</p>
            <div style={{ height: '18rem', display: 'flex', paddingTop: '2rem', paddingLeft: '2rem' }}>
                <div style={{ width: '30%', display: 'flex', }}>
                    <img src={CoralDataSet[points[props.selectedTab]].image.src} width={CoralDataSet[points[props.selectedTab]].image.width} height={CoralDataSet[points[props.selectedTab]].image.height} style={{
                        borderRadius: '15px',
                    }} />
                </div>
                <div style={{ width: '70%' }}>
                    <MyResponsivePie data={CoralDataSet[points[props.selectedTab]].datasets[props.coralPoint]} theme={GraphThemes} units={CoralDataSet[points[props.selectedTab]].units} />
                </div>
            </div>
        </>
    )
}

export default TabContent;