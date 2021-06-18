import React, {useEffect, useState} from 'react';
import {generateCsvFile} from '../utils/generateCsvFile'
import {Button, DatePicker, Row, Col, Input, Layout} from "antd";

const {Header, Content} = Layout;

interface ISearch {
    conference: string;
    startYear: string;
    endYear: string;
}

const Home = () => {
    const [search, setSearch] = useState<ISearch>({} as ISearch)
    const {RangePicker} = DatePicker;
    const handlerProccesData = async () => {
        if (search.conference && search.startYear && search.endYear) {
            await generateCsvFile({
                conference: search.conference,
                startYear: search.startYear.toString(),
                endYear: search.endYear.toString()
            })
        } else {
            alert('Dados invalidos');
        }
    }

    const onChangeCalendar = (value: any) => {
        setSearch({conference: search.conference, startYear: value[0].year(), endYear: value[1].year()})
    }

    useEffect(() => {
        console.log(search)
    })

    return (<>
            <Header/>
            <Content>
                <Row>
                    <Col span={6}>
                        <Input alt={'conferencia'}
                               onInput={event => setSearch({...search, conference: event.currentTarget.value})}
                               required={true}/>
                    </Col>
                    <RangePicker picker="year" onChange={onChangeCalendar}/>
                    <Button type={"primary"} onClick={handlerProccesData}>Processar Dados</Button>
                </Row>
            </Content>
        </>
    );
};

export default Home;