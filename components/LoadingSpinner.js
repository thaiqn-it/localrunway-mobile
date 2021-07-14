import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';

export default function LoadingSpinner({isLoading}) {
    return (
        <Spinner
            visible={isLoading}
            textContent={'Loading...'}
        />
    )
}

const styles = StyleSheet.create({})
