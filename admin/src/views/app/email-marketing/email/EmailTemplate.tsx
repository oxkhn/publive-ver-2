import React from 'react'

const EmailTemplate = ({ bannerUrl, content }: { bannerUrl: string; content: string }) => {
    return (
        <div style={{ boxSizing: 'border-box', margin: 0 }}>
            <div
                style={{
                    boxSizing: 'border-box',
                    width: '100%',
                    textAlign: 'center',
                    display: 'flex',
                    fontFamily: 'sans-serif',
                    backgroundColor: 'rgb(255,255,255)'
                }}
            >
                <table
                    width='100%'
                    style={{
                        boxSizing: 'border-box',
                        margin: '0 auto',
                        width: '100%',
                        maxWidth: '600px',
                        borderCollapse: 'collapse',
                        fontFamily: 'sans-serif'
                    }}
                >
                    <tbody style={{ boxSizing: 'border-box', fontFamily: 'sans-serif' }}>
                        <tr style={{ boxSizing: 'border-box', fontFamily: 'sans-serif' }}>
                            <td
                                valign='top'
                                align='center'
                                style={{
                                    boxSizing: 'border-box',
                                    verticalAlign: 'top',
                                    textAlign: 'center',
                                    fontFamily: 'sans-serif'
                                }}
                            >
                                <a href='https://shopee.vn' target='_blank' rel='noopener noreferrer'>
                                    <img
                                        src='https://cf.shopee.vn/file/vn-50009109-0bc5a990af84ca17768c69a65101f874'
                                        width='149'
                                        height='46'
                                        style={{
                                            boxSizing: 'border-box',
                                            width: '149px',
                                            height: '46px',
                                            fontFamily: 'sans-serif',
                                            color: 'rgb(0,0,0)'
                                        }}
                                        alt='Shopee Logo'
                                    />
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div style={{ boxSizing: 'border-box', backgroundColor: 'rgb(255,255,255)' }}>
                <div
                    style={{
                        boxSizing: 'border-box',
                        width: '100%',
                        textAlign: 'center',
                        display: 'flex',
                        fontFamily: 'sans-serif'
                    }}
                >
                    <table
                        width='100%'
                        style={{
                            boxSizing: 'border-box',
                            margin: '0 auto',
                            width: '100%',
                            maxWidth: '600px',
                            borderCollapse: 'collapse',
                            fontFamily: 'sans-serif'
                        }}
                    >
                        <tbody style={{ boxSizing: 'border-box', fontFamily: 'sans-serif' }}>
                            <tr style={{ boxSizing: 'border-box', fontFamily: 'sans-serif' }}>
                                <td
                                    width='100%'
                                    valign='top'
                                    align='center'
                                    style={{
                                        boxSizing: 'border-box',
                                        verticalAlign: 'top',
                                        textAlign: 'center',
                                        width: '100%',
                                        minHeight: '24px',
                                        fontFamily: 'sans-serif',
                                        fontSize: 'small'
                                    }}
                                >
                                    <img src={bannerUrl} alt='Banner' style={{ height: '100px', objectFit: 'cover' }} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <br />
                <br />
            </div>

            <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>

            <img
                width='1px'
                height='1px'
                alt=''
                src='https://email.mg.shopee.sg/o/eJxMzcFuhCAQgOGnKTcIjDjIgYcxMAJZHVtBuvv2TbOH9vznz5fC4mD2k6BgHCAYBLOIEgCs13rDZKcNwBsNs0Fto59stBZJ1NDK-UkkBys-e1UGF4MqXmXkeXSDj-bcsURMWjXi1Kl1Ota6f1j9PlXL4gqcV1ac7xdxqXT_1XgeYgQQT3m0LPPa6Xt9yZrCm7jn6ys156nvj6LlXgeJp_yV6AqVt_O_8xMAAP__D15Klw'
                style={{ display: 'none' }}
            />
        </div>
    )
}

export default EmailTemplate
